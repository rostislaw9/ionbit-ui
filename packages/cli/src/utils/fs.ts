import type { Config } from "../config";

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";

import { CONFIG_FILE } from "../config";

export function loadConfig(cwd = process.cwd()): Config | null {
  const configPath = resolve(cwd, CONFIG_FILE);
  if (!existsSync(configPath)) return null;
  return JSON.parse(readFileSync(configPath, "utf-8")) as Config;
}

export function saveConfig(config: Config, cwd = process.cwd()): void {
  const configPath = resolve(cwd, CONFIG_FILE);
  writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
}

export function ensureDir(filePath: string): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

export function writeFile(filePath: string, content: string): void {
  ensureDir(filePath);
  writeFileSync(filePath, content);
}

export function resolveTargetPath(
  target: string,
  config: Config,
  cwd = process.cwd(),
): string {
  // Map registry target paths to the user's configured aliases.
  // e.g. "components/ui/button.tsx" -> "{cwd}/components/ui/button.tsx"
  //      "components/motion/spotlight.tsx" -> "{cwd}/components/motion/spotlight.tsx"
  //      "lib/utils.ts" -> "{cwd}/lib/utils.ts"
  //      "styles/tokens.css" -> "{cwd}/styles/tokens.css"
  let resolved = target;

  if (target.startsWith("components/ui/")) {
    resolved = target.replace(
      "components/ui/",
      config.aliases.components + "/",
    );
  } else if (target.startsWith("components/motion/")) {
    resolved = target.replace(
      "components/motion/",
      config.aliases.motion + "/",
    );
  } else if (target.startsWith("lib/")) {
    resolved = target.replace("lib/", config.aliases.lib + "/");
  } else if (target.startsWith("styles/")) {
    resolved = target.replace("styles/", config.aliases.styles + "/");
  }

  const resolvedPath = resolve(cwd, resolved);
  const root = resolve(cwd);
  // Registry-controlled target paths must stay inside the project.
  if (resolvedPath !== root && !resolvedPath.startsWith(root + sep)) {
    throw new Error(
      `Refusing to write outside the project directory: ${target}`,
    );
  }
  return resolvedPath;
}
