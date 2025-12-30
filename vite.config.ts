import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { generateTypes } from "./vite-plugin-types";

export default defineConfig({
  plugins: [react(), generateTypes()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/register.ts"),
      name: "reactMovieApp",
      fileName: (format) => `react-movie-app.${format}.js`,
      formats: ["es", "umd"],
    },
    sourcemap: true, // Add this line to generate source maps
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        sourcemap: true, // Also add here for rollup output
      },
    },
  },
});
