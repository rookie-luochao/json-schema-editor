import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: ["dist/es", "dist/cjs"],
      include: ["src/**/*.ts", "src/**/*.vue"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "jsonSchemaEnhancedEditorVue",
    },
    rollupOptions: {
      external: [
        "vue",
        "@codemirror/autocomplete",
        "@codemirror/commands",
        "@codemirror/lang-json",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/state",
        "@codemirror/view",
        "@lezer/common",
        "@uiw/codemirror-theme-vscode",
        "codemirror-json-schema",
      ],
      output: [
        {
          format: "es",
          dir: "dist/es",
          entryFileNames: "[name].js",
          preserveModules: true,
          globals: {
            vue: "Vue",
          },
        },
        {
          format: "cjs",
          dir: "dist/cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          globals: {
            vue: "Vue",
          },
        },
      ],
    },
  },
});
