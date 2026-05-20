import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

import path from "path";

import { fileURLToPath } from "url";

// ========================================
// __dirname FIX FOR ES MODULES
// ========================================

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// ========================================
// VITE CONFIG
// ========================================

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: "0.0.0.0",

    port: 5173,
  },

  preview: {
    host: "0.0.0.0",

    port: 4173,
  },

  build: {
    outDir: "dist",

    sourcemap: false,
  },
});
