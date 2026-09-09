import type { Plugin } from "vite";

import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import { PACKAGE_MANAGERS, pmInstallCmd } from "./src/lib/package-managers";

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [
        import("shiki/themes/github-dark-default.mjs"),
        import("shiki/themes/github-light-default.mjs"),
      ],
      langs: [
        import("shiki/langs/tsx.mjs"),
        import("shiki/langs/bash.mjs"),
        import("shiki/langs/css.mjs"),
        import("shiki/langs/json.mjs"),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

async function highlight(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang,
    themes: { dark: "github-dark-default", light: "github-light-default" },
    defaultColor: "dark",
  });
}

const LANG_MAP: Record<string, string> = {
  ".tsx": "tsx",
  ".ts": "tsx",
  ".jsx": "tsx",
  ".js": "tsx",
  ".bash": "bash",
  ".sh": "bash",
  ".css": "css",
};

/** Package manager `add` commands for radix-ui dependency installation. */
const PM_ADD_RADIX = pmInstallCmd("radix-ui");

/** Package manager `add` commands for @base-ui/react dependency installation. */
const PM_ADD_BASE_UI = pmInstallCmd("@base-ui/react");

/** Package manager install commands for ionbit-ui (used by util pages). */
const PM_INSTALL_IONBIT = pmInstallCmd("ionbit-ui");

/** CSS import for util pages — matches shadcn pattern. */
const UTIL_CSS_IMPORT = `@import "tailwindcss";
@import "ionbit-ui/tailwind.css";`;

/** Installation page — config JSON. */
const INSTALL_CONFIG_JSON = `{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "style": "digital",
  "tailwind": {
    "css": "src/index.css",
    "cssVariables": true
  },
  "aliases": {
    "components": "src/components/ui",
    "motion": "src/components/motion",
    "lib": "src/lib",
    "styles": "src/styles"
  }
}`;

/** Installation page — CSS imports. */
const INSTALL_CSS_IMPORTS = `@import "tailwindcss";

@import "./styles/tokens.css";
@import "./styles/base.css";
@import "./styles/utilities.css";`;

/** Installation page — TSX import example. */
const INSTALL_TSX_EXAMPLE = `import { Button } from "@/components/ui/button";

export function App() {
  return <Button variant="primary">Click me</Button>;
}`;

/** Installation page — package-manager commands. */
const INSTALL_INIT_CMDS = Object.fromEntries(
  PACKAGE_MANAGERS.map((pm) => [pm.id, `${pm.prefix} ionbit-ui@latest init`]),
);
const INSTALL_ADD_CMDS = Object.fromEntries(
  PACKAGE_MANAGERS.map((pm) => [
    pm.id,
    `${pm.prefix} ionbit-ui@latest add button`,
  ]),
);
const INSTALL_ADD_MULTIPLE_CMDS = Object.fromEntries(
  PACKAGE_MANAGERS.map((pm) => [
    pm.id,
    `${pm.prefix} ionbit-ui@latest add button dialog accordion`,
  ]),
);
const INSTALL_LIST_CMDS = Object.fromEntries(
  PACKAGE_MANAGERS.map((pm) => [pm.id, `${pm.prefix} ionbit-ui@latest list`]),
);

/** Highlight a command map (Record<string, string>) for all package managers. */
async function highlightCmdMap(
  cmds: Record<string, string>,
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const pm of PACKAGE_MANAGERS) {
    result[pm.id] = await highlight(cmds[pm.id]!, "bash");
  }
  return result;
}

interface RegistryItem {
  name: string;
  files: { path: string; type: string; target: string }[];
  dependencies?: string[];
}

let registryCache: RegistryItem[] | null = null;

function loadRegistry(): RegistryItem[] {
  if (registryCache) return registryCache;
  const registryPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../../registry.json",
  );
  const content = readFileSync(registryPath, "utf-8");
  const data = JSON.parse(content) as { items: RegistryItem[] };
  registryCache = data.items;
  return registryCache;
}

/** Extract the target filename from a registry file path. */
function targetFilename(file: {
  path: string;
  type: string;
  target: string;
}): string {
  return file.target || file.path.split("/").pop() || "component.tsx";
}

/**
 * Unescape template-literal escape sequences in raw file text.
 * readFileSync returns literal `\n` (backslash + n); JavaScript evaluation
 * would turn these into real newlines. We do it manually so Shiki sees
 * the same string the browser would.
 */
function unescapeTemplateLiteral(s: string): string {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\`/g, "`")
    .replace(/\\\$/g, "$")
    .replace(/\\\\/g, "\\");
}

/** Extract usageImport, usageCode, section code, and setup strings from a registry .tsx file. */
function extractUsageFields(filePath: string): {
  name: string;
  usageImport?: string;
  usageCode?: string;
  sectionCodes: string[];
  setup?: { filename: string; code: string };
  infoBlocks: { code: string; lang: string }[];
} {
  const content = readFileSync(filePath, "utf-8");
  const nameMatch = content.match(/name:\s*"([^"]+)"/);
  const name = nameMatch ? nameMatch[1] : "";
  const importMatch = content.match(/usageImport:\s*`([\s\S]*?)`\s*,/);
  const usageImport = importMatch
    ? unescapeTemplateLiteral(importMatch[1])
    : undefined;
  const codeMatch = content.match(/usageCode:\s*`([\s\S]*?)`\s*,/);
  const usageCode = codeMatch
    ? unescapeTemplateLiteral(codeMatch[1])
    : undefined;
  const sectionCodes: string[] = [];
  const sectionCodeRegex = /code:\s*`([\s\S]*?)`\s*,/g;
  let sectionMatch;
  while ((sectionMatch = sectionCodeRegex.exec(content)) !== null) {
    sectionCodes.push(unescapeTemplateLiteral(sectionMatch[1]));
  }
  // Extract setup: { filename: "...", code: `...` }
  const setupFilenameMatch = content.match(
    /setup:\s*\{[^}]*filename:\s*"([^"]+)"/,
  );
  const setupCodeMatch = content.match(/setup:\s*\{[^}]*code:\s*`([\s\S]*?)`/);
  const setup =
    setupFilenameMatch && setupCodeMatch
      ? {
          filename: setupFilenameMatch[1],
          code: unescapeTemplateLiteral(setupCodeMatch[1]),
        }
      : undefined;
  // Extract infoBlocks: [ { code, lang? }, ... ]
  // Use \], to avoid stopping at ] inside code template literals (e.g. [open, setOpen]).
  // Only extract code and lang (description is a ReactNode, not a string).
  // For each code, search the surrounding block territory (between the previous
  // code and the next code) for an optional lang field.
  const infoBlocks: { code: string; lang: string }[] = [];
  const infoBlocksMatch = content.match(/infoBlocks:\s*\[([\s\S]*?)\],/);
  if (infoBlocksMatch) {
    const blockSection = infoBlocksMatch[1];
    const codeRegex = /code:\s*`([\s\S]*?)`/g;
    const codePositions: { start: number; end: number; code: string }[] = [];
    let codeMatch;
    while ((codeMatch = codeRegex.exec(blockSection)) !== null) {
      codePositions.push({
        start: codeMatch.index,
        end: codeMatch.index + codeMatch[0].length,
        code: unescapeTemplateLiteral(codeMatch[1]),
      });
    }
    for (let i = 0; i < codePositions.length; i++) {
      const territoryStart = i > 0 ? codePositions[i - 1]!.end : 0;
      const territoryEnd =
        i + 1 < codePositions.length
          ? codePositions[i + 1]!.start
          : blockSection.length;
      const territory = blockSection.slice(territoryStart, territoryEnd);
      const langMatch = territory.match(/lang:\s*"([^"]*)"/);
      infoBlocks.push({
        code: codePositions[i]!.code,
        lang: langMatch ? langMatch[1]! : "tsx",
      });
    }
  }
  return { name, usageImport, usageCode, sectionCodes, setup, infoBlocks };
}

/** Scan a registry directory and return extracted fields for each file. */
function scanRegistryDir(dir: string) {
  const files = readdirSync(dir).filter(
    (f) => f.endsWith(".tsx") && f !== "types.tsx" && f !== "index.tsx",
  );
  return files.map((f) => extractUsageFields(resolve(dir, f)));
}

/**
 * Vite plugin that pre-highlights all code at build time using Shiki.
 *
 * Two mechanisms:
 * 1. File-based: `import html from "./demo.tsx?highlighted"` — reads the
 *    file at build time and returns highlighted HTML.
 * 2. Virtual module: `virtual:highlighted-inline` — a JSON map of
 *    component name → { importHtml, codeHtml, install } for usage examples
 *    and install commands.
 * 3. Per-component virtual module: `virtual:highlighted-source/<name>` —
 *    returns `{ sourceFiles, depInstall }` for the manual install tab.
 *    Dynamically imported by InstallBlock only when the Manual tab is
 *    opened, so source code doesn't bloat the main bundle.
 *
 * This eliminates the entire Shiki runtime from the browser bundle.
 */
export function shikiHighlightPlugin(): Plugin {
  return {
    name: "shiki-highlight",
    enforce: "pre",

    async resolveId(id, importer) {
      // File-based: ?highlighted suffix
      if (id.includes("?highlighted")) {
        // Strip the ?highlighted query to get the plain file path
        const plainPath = id.replace("?highlighted", "");
        const resolved = await this.resolve(plainPath, importer, {
          skipSelf: true,
        });
        if (!resolved) return null;
        // Use the resolved file path (without query) as the virtual id
        const filePath = resolved.id.split("?")[0];
        return `\0shiki-highlight:${filePath}`;
      }
      // Virtual module for inline code
      if (id === "virtual:highlighted-inline") {
        return "\0virtual:highlighted-inline";
      }
      // Virtual module: map of lazy import functions for source data
      if (id === "virtual:highlighted-sources-map") {
        return "\0virtual:highlighted-sources-map";
      }
      // Per-component source module: virtual:highlighted-source/<name>
      if (id.startsWith("virtual:highlighted-source/")) {
        return `\0${id}`;
      }
      return null;
    },

    async load(id) {
      // File-based highlighting
      if (id.startsWith("\0shiki-highlight:")) {
        const filePath = id.slice("\0shiki-highlight:".length);
        const code = readFileSync(filePath, "utf-8");
        const ext = filePath.slice(filePath.lastIndexOf("."));
        const lang = LANG_MAP[ext] ?? "tsx";
        const html = await highlight(code, lang);
        // Register the source file as a dependency so Vite invalidates
        // this virtual module when the source changes (HMR support).
        this.addWatchFile(filePath);
        return {
          code: `export default ${JSON.stringify(html)};`,
          map: null,
        };
      }

      // Virtual module: pre-highlighted inline code (usage, cursor)
      if (id === "\0virtual:highlighted-inline") {
        const baseDir = dirname(fileURLToPath(import.meta.url));
        const componentDir = resolve(baseDir, "src/registry/components");
        const utilDir = resolve(baseDir, "src/registry/utils");

        const result: Record<
          string,
          {
            importHtml?: string;
            codeHtml?: string;
            rawCode?: string;
            setupHtml?: string;
            setupRawCode?: string;
            setupFilename?: string;
            install: Record<string, string>;
          }
        > = {};

        // Components: usage import/code + install commands + setup + info blocks
        for (const {
          name,
          usageImport,
          usageCode,
          setup,
          infoBlocks,
        } of scanRegistryDir(componentDir)) {
          if (!name) continue;
          const entry: {
            importHtml?: string;
            codeHtml?: string;
            rawCode?: string;
            setupHtml?: string;
            setupRawCode?: string;
            setupFilename?: string;
            install: Record<string, string>;
          } = { install: {} };
          if (usageImport)
            entry.importHtml = await highlight(usageImport, "tsx");
          if (usageCode) entry.codeHtml = await highlight(usageCode, "tsx");
          if (setup) {
            entry.setupHtml = await highlight(setup.code, "tsx");
            entry.setupRawCode = setup.code;
            entry.setupFilename = setup.filename;
          }
          for (const pm of PACKAGE_MANAGERS) {
            entry.install[pm.id] = await highlight(
              `${pm.prefix} ionbit-ui@latest add ${name}`,
              "bash",
            );
          }
          result[name] = entry;
          // Pre-highlight info block codes
          for (let i = 0; i < infoBlocks.length; i++) {
            result[`__info_${name}_${i}__`] = {
              codeHtml: await highlight(
                infoBlocks[i]!.code,
                infoBlocks[i]!.lang,
              ),
              rawCode: infoBlocks[i]!.code,
              install: {},
            };
          }
        }

        // Static blocks: util install commands, util CSS import
        const utilInstall: Record<string, string> = {};
        for (const pm of PACKAGE_MANAGERS) {
          utilInstall[pm.id] = await highlight(
            PM_INSTALL_IONBIT[pm.id]!,
            "bash",
          );
        }
        result["__util_install__"] = { install: utilInstall };
        result["__util_css__"] = {
          codeHtml: await highlight(UTIL_CSS_IMPORT, "css"),
          install: {},
        };

        // Installation page blocks
        result["__install_init__"] = {
          install: await highlightCmdMap(INSTALL_INIT_CMDS),
        };
        result["__install_add__"] = {
          install: await highlightCmdMap(INSTALL_ADD_CMDS),
        };
        result["__install_add_multiple__"] = {
          install: await highlightCmdMap(INSTALL_ADD_MULTIPLE_CMDS),
        };
        result["__install_list__"] = {
          install: await highlightCmdMap(INSTALL_LIST_CMDS),
        };
        result["__install_config__"] = {
          codeHtml: await highlight(INSTALL_CONFIG_JSON, "json"),
          rawCode: INSTALL_CONFIG_JSON,
          install: {},
        };
        result["__install_css__"] = {
          codeHtml: await highlight(INSTALL_CSS_IMPORTS, "css"),
          rawCode: INSTALL_CSS_IMPORTS,
          install: {},
        };
        result["__install_tsx__"] = {
          codeHtml: await highlight(INSTALL_TSX_EXAMPLE, "tsx"),
          rawCode: INSTALL_TSX_EXAMPLE,
          install: {},
        };

        // Utils: usage code + section code
        for (const { name, usageCode, sectionCodes } of scanRegistryDir(
          utilDir,
        )) {
          if (!name) continue;
          if (usageCode) {
            result[`__util_usage_${name}__`] = {
              codeHtml: await highlight(usageCode, "tsx"),
              install: {},
            };
          }
          for (let i = 0; i < sectionCodes.length; i++) {
            result[`__util_section_code_${name}_${i}__`] = {
              codeHtml: await highlight(sectionCodes[i], "tsx"),
              install: {},
            };
          }
        }

        return {
          code: `export default ${JSON.stringify(result)};`,
          map: null,
        };
      }

      // Virtual module: map of lazy import functions for source data.
      // This lets InstallBlock dynamically import only the requested
      // component's source code without bundling all source into the main chunk.
      if (id === "\0virtual:highlighted-sources-map") {
        const componentDir = resolve(
          dirname(fileURLToPath(import.meta.url)),
          "src/registry/components",
        );
        const names = scanRegistryDir(componentDir)
          .map((f) => f.name)
          .filter(Boolean);

        const lines = names.map(
          (n) =>
            `  ${JSON.stringify(n)}: () => import(${JSON.stringify(`virtual:highlighted-source/${n}`)}),`,
        );
        return {
          code: `export default {\n${lines.join("\n")}\n};`,
          map: null,
        };
      }

      // Per-component source module: \0virtual:highlighted-source/<name>
      if (id.startsWith("\0virtual:highlighted-source/")) {
        const compName = id.slice("\0virtual:highlighted-source/".length);
        const registryItems = loadRegistry();
        const registryByName: Record<string, RegistryItem> = {};
        for (const item of registryItems) {
          registryByName[item.name] = item;
        }

        const sourceFiles: {
          filename: string;
          html: string;
          rawCode: string;
        }[] = [];

        const item = registryByName[compName];
        if (item) {
          for (const f of item.files) {
            // Only include .tsx/.ts source files, skip CSS.
            if (!f.path.endsWith(".tsx") && !f.path.endsWith(".ts")) continue;
            const srcPath = resolve(
              dirname(fileURLToPath(import.meta.url)),
              "../../",
              f.path,
            );
            try {
              const rawCode = readFileSync(srcPath, "utf-8");
              const html = await highlight(rawCode, "tsx");
              sourceFiles.push({
                filename: targetFilename(f),
                html,
                rawCode,
              });
            } catch {
              // Skip files that don't exist.
            }
          }
        }

        // Generate dependency install commands based on the component's
        // dependencies. Radix UI components install `radix-ui`; Base UI
        // components install `@base-ui/react`.
        const deps = item?.dependencies ?? [];
        const pmAdd =
          deps.some((d) => d.startsWith("@base-ui/")) &&
          !deps.some((d) => d.startsWith("@radix-ui/"))
            ? PM_ADD_BASE_UI
            : PM_ADD_RADIX;
        const depInstall: Record<string, string> = {};
        for (const pm of PACKAGE_MANAGERS) {
          depInstall[pm.id] = await highlight(pmAdd[pm.id]!, "bash");
        }

        const payload = { sourceFiles, depInstall };
        return {
          code: `export default ${JSON.stringify(payload)};`,
          map: null,
        };
      }

      return null;
    },
  };
}
