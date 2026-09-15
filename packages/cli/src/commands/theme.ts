import type { Config, ThemeEntry } from "../config";

import chalk from "chalk";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

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
    css = generateThemeCss(custom, label);
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

function colorMix(color: string, amount: number): string {
  return `color-mix(in oklab, ${color} ${amount}%, transparent)`;
}

function hoverColor(color: string): string {
  return `color-mix(in oklab, ${color} 88%, black)`;
}

function colorsToCss(
  colors: Record<string, string>,
  translucency: number,
  light: boolean,
): string {
  const muted = Math.round(translucency * 160);
  const subtle = Math.round(translucency * 80);
  const borderBase = light ? "0 0 0" : "1 0 0";
  return [
    `  --background: ${colors.background};`,
    `  --surface: ${colors.surface};`,
    `  --surface-elevated: ${colors.surfaceElevated};`,
    `  --surface-hover: ${colors.surfaceHover};`,
    `  --foreground: ${colors.foreground};`,
    `  --foreground-muted: ${colors.foregroundMuted};`,
    `  --foreground-subtle: ${colors.foregroundSubtle};`,
    `  --accent: ${colors.accent};`,
    `  --accent-hover: ${colors.accentHover};`,
    `  --accent-foreground: ${colors.accentForeground};`,
    `  --accent-muted: ${colorMix(colors.accent!, muted)};`,
    `  --accent-subtle: ${colorMix(colors.accent!, subtle)};`,
    ...statusCss("success", colors.success!, muted, subtle, light, "155"),
    ...statusCss("warning", colors.warning!, muted, subtle, light, "80"),
    ...statusCss("error", colors.error!, muted, subtle, light, "5"),
    ...statusCss("info", colors.info!, muted, subtle, light, "230"),
    `  --ring: ${colors.ring};`,
    `  --border: oklch(${borderBase} / ${translucency.toFixed(2)});`,
    `  --border-strong: oklch(${borderBase} / ${(translucency * 1.75).toFixed(2)});`,
    `  --border-accent: ${colorMix(colors.accent!, 50)};`,
    `  --border-error: ${colorMix(colors.error!, 50)};`,
    `  --border-success: ${colorMix(colors.success!, 50)};`,
    `  --border-warning: ${colorMix(colors.warning!, 50)};`,
    `  --border-info: ${colorMix(colors.info!, 50)};`,
  ].join("\n");
}

function statusCss(
  name: string,
  color: string,
  muted: number,
  subtle: number,
  light: boolean,
  hue: string,
): string[] {
  return [
    `  --${name}: ${color};`,
    `  --${name}-hover: ${hoverColor(color)};`,
    `  --${name}-muted: ${colorMix(color, muted)};`,
    `  --${name}-subtle: ${colorMix(color, subtle)};`,
    `  --${name}-foreground: ${light ? "oklch(0.99 0 0)" : `oklch(0.1 0.03 ${hue})`};`,
  ];
}

function generateThemeCss(theme: CustomTheme, label: string): string {
  const radius = Object.entries(theme.radius)
    .map(([key, value]) => `  --radius-${key}: ${value};`)
    .join("\n");
  const settings = Object.entries(theme.settings)
    .filter(([key]) => key.endsWith("Intensity"))
    .map(
      ([key, value]) =>
        `  --${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${value};`,
    )
    .join("\n");
  const block = (colors: Record<string, string>, light: boolean) =>
    `${light ? ".light" : ":root"} {\n${colorsToCss(colors, Number(theme.settings.translucency), light)}\n${radius}\n${settings}\n}`;
  return `/* Ionbit UI — Theme: ${label} */\n${block(theme.dark, false)}\n\n${block(theme.light, true)}`;
}
