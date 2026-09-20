#!/usr/bin/env node
/*
 * Builds individual registry item JSON files from registry.json.
 *
 * Each output file (registry/items/{name}.json) contains the full registry
 * item with file contents embedded, ready to be served via a URL endpoint
 * or fetched directly from the GitHub repo.
 */
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
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
    // sibling modules via ../ (../hooks/, ../tokens, ../style-observer,
    // etc.). When installed to components/motion/ the primitives/ segment
    // is flattened away, so every ../ import specifier must become ./.
    // Only import specifiers are rewritten — a bare ../ in a comment or
    // string literal is not a module reference.
    const target = file.target ?? file.path;
    if (
      target.startsWith("components/motion/") &&
      !target.includes("/hooks/") &&
      !target.endsWith("/tokens.ts") &&
      !target.endsWith("/styles.ts") &&
      !target.endsWith("/pointer-coordinator.ts") &&
      !target.endsWith("/intersection-observer-pool.ts") &&
      !target.endsWith("/style-observer.ts")
    ) {
      content = content.replace(
        /(from\s+["']|import\s+["']|import\s*\(\s*["'])\.\.\//g,
        "$1./",
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

// Prune items removed or renamed in registry.json — without this the
// stale file keeps being served as if the item still exists.
const itemNames = new Set(registry.items.map((item) => `${item.name}.json`));
for (const file of readdirSync(outDir)) {
  if (file.endsWith(".json") && !itemNames.has(file)) {
    unlinkSync(resolve(outDir, file));
    console.log(`  ✗ removed stale registry/items/${file}`);
  }
}

/**
 * Transpiles a TS file to CommonJS and evaluates it with a `require`
 * shim that resolves relative specifiers through the same pipeline.
 * Type-only imports are erased by the transpiler, so data modules with
 * interface-only imports (theme presets, theme-css) load cleanly.
 */
function loadTsModule(absPath) {
  const source = readFileSync(absPath, "utf-8");
  const { outputText } = transpileModule(source, {
    compilerOptions: {
      module: ModuleKind.CommonJS,
      target: ScriptTarget.ES2020,
    },
  });
  const module = { exports: {} };
  const localRequire = (specifier) => {
    if (!specifier.startsWith("."))
      throw new Error(`unsupported import: ${specifier}`);
    return loadTsModule(resolve(dirname(absPath), `${specifier}.ts`));
  };
  new Function("require", "module", "exports", outputText)(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}

// theme-presets-data aggregates the three preset groups; loading it
// (instead of a hardcoded file list) keeps themes.json in sync whenever
// a preset file is added or removed.
const { THEME_PRESETS } = loadTsModule(
  resolve(root, "apps/docs/src/data/theme-presets-data.ts"),
);
const { generateThemeCss } = loadTsModule(
  resolve(root, "packages/tokens/src/theme-css.ts"),
);

const themes = THEME_PRESETS.map((theme) => ({
  id: theme.id,
  label: theme.label,
  description: theme.description,
  css: generateThemeCss(theme),
}));
writeFileSync(
  resolve(root, "registry", "themes.json"),
  JSON.stringify({ themes }, null, 2) + "\n",
);
console.log(
  `Built ${registry.items.length} registry items and ${themes.length} themes.`,
);
