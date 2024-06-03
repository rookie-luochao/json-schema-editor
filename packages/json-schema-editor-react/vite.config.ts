import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./examples",
  build: {
    outDir: resolve(__dirname, "dist-app"),
  },
});
