import type { Registry, RegistryItem, ThemeRegistry } from "../config";

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { REGISTRY_ITEM_URL, REGISTRY_URL, THEME_REGISTRY_URL } from "../config";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Find the registry.json — checks local paths first, then falls back to the
 * remote GitHub URL. This allows development/testing without pushing to GitHub.
 */
function findLocalRegistry(): string | null {
  const candidates = [
    // Relative to cwd (user's project)
    resolve(process.cwd(), "registry.json"),
    // Relative to CLI dist (packages/cli/dist -> ../../../registry.json)
    resolve(__dirname, "../../../registry.json"),
    // Relative to CLI src/utils (packages/cli/src/utils -> ../../../../registry.json)
    resolve(__dirname, "../../../../registry.json"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function findLocalRegistryItem(name: string): string | null {
  const candidates = [
    resolve(process.cwd(), "registry/items", `${name}.json`),
    resolve(__dirname, "../../../registry/items", `${name}.json`),
    resolve(__dirname, "../../../../registry/items", `${name}.json`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function findLocalThemes(): string | null {
  const candidates = [
    resolve(process.cwd(), "registry/themes.json"),
    resolve(__dirname, "../../../registry/themes.json"),
    resolve(__dirname, "../../../../registry/themes.json"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

export async function fetchRegistry(): Promise<Registry> {
  const localPath = findLocalRegistry();
  if (localPath) {
    return JSON.parse(readFileSync(localPath, "utf-8")) as Registry;
  }

  const res = await fetch(REGISTRY_URL);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch registry: ${res.status} ${res.statusText}`,
    );
  }
  return (await res.json()) as Registry;
}

export async function fetchRegistryItem(name: string): Promise<RegistryItem> {
  const localPath = findLocalRegistryItem(name);
  if (localPath) {
    return JSON.parse(readFileSync(localPath, "utf-8")) as RegistryItem;
  }

  const res = await fetch(`${REGISTRY_ITEM_URL}/${name}.json`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch registry item "${name}": ${res.status} ${res.statusText}`,
    );
  }
  return (await res.json()) as RegistryItem;
}

export async function fetchRegistryItems(
  names: string[],
): Promise<RegistryItem[]> {
  return Promise.all(names.map(fetchRegistryItem));
}

export async function fetchThemeRegistry(): Promise<ThemeRegistry> {
  const localPath = findLocalThemes();
  if (localPath) {
    return JSON.parse(readFileSync(localPath, "utf-8")) as ThemeRegistry;
  }

  const res = await fetch(THEME_REGISTRY_URL);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch theme registry: ${res.status} ${res.statusText}`,
    );
  }
  return (await res.json()) as ThemeRegistry;
}
