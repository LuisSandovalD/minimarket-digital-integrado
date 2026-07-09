import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    visualizer({
      filename: "stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,

    hmr: {
      clientPort: 80,
      protocol: "ws",
    },

    watch: {
      usePolling: true,
      interval: 100,
      ignored: ["**/node_modules/**", "**/dist/**"],
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom", "lucide-react", "emoji-picker-react"],
  },

  preview: {
    host: "0.0.0.0",
    port: 4173,
  },

  build: {
    outDir: "dist",
    sourcemap: false,

    // Aumenta el límite de advertencia para proyectos grandes
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // React
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("scheduler")
          ) {
            return "react-vendor";
          }

          // Gráficos
          if (id.includes("recharts") || id.includes("chart.js")) {
            return "charts";
          }

          // Excel
          if (id.includes("xlsx") || id.includes("exceljs")) {
            return "excel";
          }

          // PDF e impresión
          if (
            id.includes("jspdf") ||
            id.includes("html2canvas") ||
            id.includes("pdfjs")
          ) {
            return "pdf";
          }

          // Emojis
          if (id.includes("emoji-picker-react")) {
            return "emoji";
          }

          // Íconos
          if (id.includes("lucide-react")) {
            return "icons";
          }

          // Todo lo demás
          return "vendor";
        },
      },
    },
  },
});
