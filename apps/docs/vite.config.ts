import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

import { shikiHighlightPlugin } from "./vite-plugin-shiki";

const ui = resolve(__dirname, "../../packages/ui/src");
const motion = resolve(__dirname, "../../packages/motion/src");

export default defineConfig({
  plugins: [react(), tailwindcss(), shikiHighlightPlugin()],
  resolve: {
    alias: [
      // @/ path aliases — match the source-owned import convention shown in docs.
      // Regex entries are matched in order; more specific patterns come first.
      // @/components/ui/<name> -> packages/ui/src/components/<name>/index.ts
      {
        find: /^@\/components\/ui\/([\w-]+)$/,
        replacement: resolve(ui, "components/$1/index.ts"),
      },
      { find: "@/components/ui", replacement: resolve(ui, "index.ts") },
      // @/components/motion/<name> -> packages/motion/src/primitives/<name>.tsx
      {
        find: /^@\/components\/motion\/([\w-]+)$/,
        replacement: resolve(motion, "primitives/$1.tsx"),
      },
      { find: "@/components/motion", replacement: resolve(motion, "index.ts") },
      { find: "@/lib/utils", replacement: resolve(ui, "lib/utils.ts") },
      // Package aliases for internal docs app code (pages, components).
      // @ionbit-ui/ui/<name> -> packages/ui/src/components/<name>/index.ts
      {
        find: /^@ionbit-ui\/ui\/([\w-]+)$/,
        replacement: resolve(ui, "components/$1/index.ts"),
      },
      { find: "@ionbit-ui/ui", replacement: resolve(ui, "index.ts") },
      { find: "@ionbit-ui/motion", replacement: resolve(motion, "index.ts") },
    ],
  },
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/")) {
            if (id.includes("node_modules/@radix-ui/")) return "vendor-radix";
            if (id.includes("node_modules/@base-ui/")) return "vendor-base-ui";
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/react-router") ||
              id.includes("node_modules/scheduler/")
            )
              return "vendor-react";
            if (id.includes("node_modules/motion/")) return "vendor-motion";
            if (id.includes("node_modules/sonner/")) return "vendor-sonner";
            if (id.includes("node_modules/lucide-react/"))
              return "vendor-lucide";
            if (id.includes("node_modules/cmdk/")) return "vendor-cmdk";
          }
        },
      },
    },
  },
});
