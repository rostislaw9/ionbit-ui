import react from "@vitejs/plugin-react";
import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Scan src/components and generate a lib entry for each component's
// index.ts. Adding a new component directory does not require editing
// this config — it is picked up automatically.
function componentEntries(): Record<string, string> {
  const componentsDir = resolve(__dirname, "src/components");
  const entries: Record<string, string> = {};
  for (const name of readdirSync(componentsDir)) {
    const dir = resolve(componentsDir, name);
    if (!statSync(dir).isDirectory()) continue;
    const indexFile = resolve(dir, "index.ts");
    try {
      statSync(indexFile);
    } catch {
      continue;
    }
    entries[name] = indexFile;
  }
  return entries;
}

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], insertTypesEntry: true })],
  resolve: {
    alias: {
      "@/components/ui": resolve(__dirname, "src/components"),
      "@/lib": resolve(__dirname, "src/lib"),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        ...componentEntries(),
        utils: resolve(__dirname, "src/lib/utils.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, name) => `${name}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@ionbit-ui/tokens",
        "@ionbit-ui/motion",
        "motion",
        "motion/react",
        /^@radix-ui\//,
        "sonner",
        "lucide-react",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "cmdk",
      ],
      // Preserve entry signatures so subpath exports map to stable files.
      preserveEntrySignatures: "strict",
      output: {
        // Group shared internal modules into named chunks so that, e.g.,
        // Button is not duplicated into dialog, sheet, alert-dialog, and
        // pagination. The chunks get content-hashed filenames but are
        // internal (referenced by relative path from entry chunks) and
        // shipped inside dist/.
        manualChunks(id) {
          if (id.includes("src/components/button/button.tsx")) {
            return "button-shared";
          }
          if (id.includes("src/components/dialog/dialog.tsx")) {
            return "dialog-shared";
          }
        },
      },
    },
  },
});
