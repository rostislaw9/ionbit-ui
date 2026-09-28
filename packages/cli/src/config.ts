// Pin the remote registry to this CLI's own release tag: a published
// package reads exactly the registry it shipped with instead of whatever
// `main` serves at fetch time. Prereleases track `main`.
const REGISTRY_REF = __CLI_VERSION__.includes("-")
  ? "main"
  : `v${__CLI_VERSION__}`;

const REGISTRY_BASE = `https://raw.githubusercontent.com/rostislaw9/ionbit-ui/${REGISTRY_REF}`;

export const REGISTRY_URL = `${REGISTRY_BASE}/registry.json`;
export const REGISTRY_ITEM_URL = `${REGISTRY_BASE}/registry/items`;
export const THEME_REGISTRY_URL = `${REGISTRY_BASE}/registry/themes.json`;

export interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

export interface RegistryFile {
  path: string;
  type: string;
  content: string;
}

export interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

export interface ThemeEntry {
  id: string;
  label: string;
  description: string;
  css: string;
}

export interface ThemeRegistry {
  themes: ThemeEntry[];
}

export interface Config {
  /** Optional JSON Schema reference for editor tooling. */
  $schema?: string;
  /** Last installed theme — a preset id or "custom". */
  theme?: string;
  style: string;
  tailwind: {
    css: string;
    cssVariables: boolean;
  };
  aliases: {
    components: string;
    motion: string;
    lib: string;
    styles: string;
  };
}

export const DEFAULT_CONFIG: Config = {
  $schema: "https://ionbit-ui-docs.onrender.com/schemas/ionbit-ui.config.json",
  style: "digital",
  tailwind: {
    css: "src/index.css",
    cssVariables: true,
  },
  aliases: {
    components: "src/components/ui",
    motion: "src/components/motion",
    lib: "src/lib",
    styles: "src/styles",
  },
};

export const CONFIG_FILE = "ionbit-ui.config.json";
