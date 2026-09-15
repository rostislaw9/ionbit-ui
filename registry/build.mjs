#!/usr/bin/env node
/*
 * Builds individual registry item JSON files from registry.json.
 *
 * Each output file (registry/items/{name}.json) contains the full registry
 * item with file contents embedded, ready to be served via a URL endpoint
 * or fetched directly from the GitHub repo.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ModuleKind, ScriptTarget, transpileModule } from "typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const registry = JSON.parse(
  readFileSync(resolve(root, "registry.json"), "utf-8"),
);

const outDir = resolve(root, "registry", "items");
mkdirSync(outDir, { recursive: true });

for (const item of registry.items) {
  const itemWithContent = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    devDependencies: item.devDependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files: [],
  };

  for (const file of item.files) {
    let content = readFileSync(resolve(root, file.path), "utf-8");

    // Motion primitives live in packages/motion/src/primitives/ and import
    // from ../hooks/, ../tokens, ../styles, and ../pointer-coordinator.
    // When installed to components/motion/ (flattened, no primitives/
    // subdir), these must become ./hooks/, ./tokens, ./styles, and
    // ./pointer-coordinator.
    const target = file.target ?? file.path;
    if (
      target.startsWith("components/motion/") &&
      !target.includes("/hooks/") &&
      !target.endsWith("/tokens.ts") &&
      !target.endsWith("/styles.ts") &&
      !target.endsWith("/pointer-coordinator.ts") &&
      !target.endsWith("/intersection-observer-pool.ts")
    ) {
      content = content
        .replace(/\.\.\/hooks\//g, "./hooks/")
        .replace(/\.\.\/tokens/g, "./tokens")
        .replace(/\.\.\/styles/g, "./styles")
        .replace(/\.\.\/pointer-coordinator/g, "./pointer-coordinator")
        .replace(
          /\.\.\/intersection-observer-pool/g,
          "./intersection-observer-pool",
        );
    }

    itemWithContent.files.push({
      path: target,
      type: file.type,
      content,
    });
  }

  const outPath = resolve(outDir, `${item.name}.json`);
  writeFileSync(outPath, JSON.stringify(itemWithContent, null, 2) + "\n");
  console.log(`  → registry/items/${item.name}.json`);
}

const THEME_GROUPS = [
  "theme-presets-digital-sunset.ts",
  "theme-presets-ocean-slate.ts",
  "theme-presets-emerald-nord.ts",
];

function loadThemeGroup(filename) {
  const source = readFileSync(
    resolve(root, "apps/docs/src/data", filename),
    "utf-8",
  );
  const { outputText } = transpileModule(source, {
    compilerOptions: {
      module: ModuleKind.CommonJS,
      target: ScriptTarget.ES2020,
    },
  });
  const module = { exports: {} };
  new Function("module", "exports", outputText)(module, module.exports);
  return Object.values(module.exports)[0];
}

function mix(color, amount) {
  return `color-mix(in oklab, ${color} ${amount}%, transparent)`;
}

function hover(color) {
  return `color-mix(in oklab, ${color} 88%, black)`;
}

function colorsToCss(colors, translucency, isLight) {
  const borderBase = isLight ? "0 0 0" : "1 0 0";
  const mutedAmount = Math.round(translucency * 160);
  const subtleAmount = Math.round(translucency * 80);
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
    `  --accent-muted: ${mix(colors.accent, mutedAmount)};`,
    `  --accent-subtle: ${mix(colors.accent, subtleAmount)};`,
    `  --success: ${colors.success};`,
    `  --success-hover: ${hover(colors.success)};`,
    `  --success-muted: ${mix(colors.success, mutedAmount)};`,
    `  --success-subtle: ${mix(colors.success, subtleAmount)};`,
    `  --success-foreground: ${isLight ? "oklch(0.99 0 0)" : "oklch(0.1 0.03 155)"};`,
    `  --warning: ${colors.warning};`,
    `  --warning-hover: ${hover(colors.warning)};`,
    `  --warning-muted: ${mix(colors.warning, mutedAmount)};`,
    `  --warning-subtle: ${mix(colors.warning, subtleAmount)};`,
    `  --warning-foreground: ${isLight ? "oklch(0.99 0 0)" : "oklch(0.1 0.03 80)"};`,
    `  --error: ${colors.error};`,
    `  --error-hover: ${hover(colors.error)};`,
    `  --error-muted: ${mix(colors.error, mutedAmount)};`,
    `  --error-subtle: ${mix(colors.error, subtleAmount)};`,
    `  --error-foreground: ${isLight ? "oklch(0.99 0 0)" : "oklch(0.1 0.04 5)"};`,
    `  --info: ${colors.info};`,
    `  --info-hover: ${hover(colors.info)};`,
    `  --info-muted: ${mix(colors.info, mutedAmount)};`,
    `  --info-subtle: ${mix(colors.info, subtleAmount)};`,
    `  --info-foreground: ${isLight ? "oklch(0.99 0 0)" : "oklch(0.1 0.03 230)"};`,
    `  --ring: ${colors.ring};`,
    `  --border: oklch(${borderBase} / ${translucency.toFixed(2)});`,
    `  --border-strong: oklch(${borderBase} / ${(translucency * 1.75).toFixed(2)});`,
    `  --border-accent: ${mix(colors.accent, 50)};`,
    `  --border-error: ${mix(colors.error, 50)};`,
    `  --border-success: ${mix(colors.success, 50)};`,
    `  --border-warning: ${mix(colors.warning, 50)};`,
    `  --border-info: ${mix(colors.info, 50)};`,
    `  --shadow-xs: 0 1px 2px 0 oklch(0 0 0 / ${isLight ? 0.06 : 0.2});`,
    `  --shadow-sm: 0 2px 4px -1px oklch(0 0 0 / ${isLight ? 0.08 : 0.25}), 0 1px 2px -1px oklch(0 0 0 / ${isLight ? 0.06 : 0.2});`,
    `  --shadow-md: 0 4px 8px -2px oklch(0 0 0 / ${isLight ? 0.1 : 0.3}), 0 2px 4px -2px oklch(0 0 0 / ${isLight ? 0.08 : 0.25});`,
    `  --shadow-lg: 0 12px 24px -8px oklch(0 0 0 / ${isLight ? 0.12 : 0.4}), 0 4px 8px -4px oklch(0 0 0 / ${isLight ? 0.1 : 0.3});`,
  ].join("\n");
}

function themeCss(theme) {
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
  const block = (colors, isLight) =>
    `${isLight ? ".light" : ":root"} {\n${colorsToCss(colors, theme.settings.translucency, isLight)}\n${radius}\n${settings}\n}`;
  return `/* Ionbit UI — Theme: ${theme.label} */\n${block(theme.dark, false)}\n\n${block(theme.light, true)}`;
}

const themes = THEME_GROUPS.flatMap(loadThemeGroup).map((theme) => ({
  id: theme.id,
  label: theme.label,
  description: theme.description,
  css: themeCss(theme),
}));
writeFileSync(
  resolve(root, "registry", "themes.json"),
  JSON.stringify({ themes }, null, 2) + "\n",
);
console.log(
  `Built ${registry.items.length} registry items and ${themes.length} themes.`,
);
