import type { Config, ThemeEntry } from "../config";
import type { ThemePreset } from "@ionbit-ui/tokens/theme-types";

import chalk from "chalk";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

import { generateThemeCss } from "@ionbit-ui/tokens/theme-css";

import { ensureDir, loadConfig } from "../utils/fs";
import { fetchThemeRegistry } from "../utils/registry";

interface CustomTheme {
  dark: Record<string, string>;
  light: Record<string, string>;
  radius: Record<string, string>;
  settings: Record<string, string | number>;
}

export async function theme(
  id: string | undefined,
  options: { custom?: string; overwrite?: boolean },
): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);

  if (!config) {
    console.log(
      chalk.red("No ionbit-ui.config.json found. Run `ionbit-ui init` first."),
    );
    process.exitCode = 1;
    return;
  }

  if (id && options.custom) {
    console.log(chalk.red("Choose a preset theme or --custom, not both."));
    process.exitCode = 1;
    return;
  }

  let css: string;
  let label: string;
  if (options.custom) {
    let custom: CustomTheme;
    try {
      custom = JSON.parse(options.custom) as CustomTheme;
      validateCustomTheme(custom);
    } catch (error) {
      const message = error instanceof Error ? error.message : "invalid JSON";
      console.log(chalk.red(`Invalid custom theme: ${message}`));
      process.exitCode = 1;
      return;
    }
    label = "Custom";
    css = generateThemeCss({
      ...custom,
      id: "custom",
      label,
      description: "",
    } as unknown as ThemePreset);
  } else {
    if (!id) {
      console.log(chalk.red("Provide a theme id or use --custom <json>."));
      process.exitCode = 1;
      return;
    }
    const registry = await fetchThemeRegistry();
    const preset = registry.themes.find((entry) => entry.id === id);
    if (!preset) {
      printThemeError(id, registry.themes);
      process.exitCode = 1;
      return;
    }
    label = preset.label;
    css = preset.css;
  }

  const themePath = resolve(cwd, config.aliases.styles, "theme.css");
  if (existsSync(themePath) && !options.overwrite) {
    console.log(
      chalk.yellow(
        `${config.aliases.styles}/theme.css already exists. Use --overwrite to replace it.`,
      ),
    );
    process.exitCode = 1;
    return;
  }

  ensureDir(themePath);
  writeFileSync(themePath, css + "\n");
  addThemeImport(config, cwd, themePath);
  console.log(chalk.green(`✓ Installed ${label} theme`));
  console.log(chalk.dim(`  ${config.aliases.styles}/theme.css`));
}

function printThemeError(id: string, themes: ThemeEntry[]): void {
  console.log(chalk.red(`Theme "${id}" not found. Available themes:`));
  console.log(themes.map((entry) => `  ${entry.id}`).join("\n"));
}

function validateCustomTheme(themeConfig: CustomTheme): void {
  for (const mode of ["dark", "light"] as const) {
    if (!themeConfig[mode] || typeof themeConfig[mode] !== "object") {
      throw new Error(`missing ${mode} colors`);
    }
  }
  if (!themeConfig.radius || !themeConfig.settings) {
    throw new Error("missing radius or settings");
  }
}

function addThemeImport(config: Config, cwd: string, themePath: string): void {
  const cssPath = resolve(cwd, config.tailwind.css);
  const importPath = relative(dirname(cssPath), themePath).replace(/\\/g, "/");
  const importLine = `@import "./${importPath}";`;
  const existing = existsSync(cssPath) ? readFileSync(cssPath, "utf-8") : "";

  if (!existing.includes(importLine)) {
    writeFileSync(cssPath, `${existing.trimEnd()}\n${importLine}\n`);
  }
}
