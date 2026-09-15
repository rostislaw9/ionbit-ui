export const REGISTRY_URL =
  "https://raw.githubusercontent.com/rostislaw9/ionbit-ui/main/registry.json";

export const REGISTRY_ITEM_URL =
  "https://raw.githubusercontent.com/rostislaw9/ionbit-ui/main/registry/items";
export const THEME_REGISTRY_URL =
  "https://raw.githubusercontent.com/rostislaw9/ionbit-ui/main/registry/themes.json";

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
  $schema: string;
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
  $schema: "https://ui.shadcn.com/schema/registry.json",
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
