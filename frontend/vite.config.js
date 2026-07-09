import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    strictPort: true, // Evita que Vite cambie de puerto si encuentra interferencia
    // Permite que la recarga en vivo viaje a través de Nginx (Puerto 80)
    hmr: {
      clientPort: 80,
      protocol: "ws", // Asegura que se use el protocolo de WebSocket estándar
    },
    // Activa la vigilancia forzada de archivos dentro del contenedor
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ["**/node_modules/**", "**/dist/**"], // Evita sobrecargar el disco de Docker
    },
  },

  optimizeDeps: {
    include: ["lucide-react", "emoji-picker-react", "react", "react-dom"],
    disabled: false,
  },

  preview: {
    host: "0.0.0.0",
    port: 4173,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 800, /
    rollupOptions: {
  output: {
    manualChunks(id) {
      // Si el archivo viene de node_modules, lo separamos en su propio paquete
      if (id.includes("node_modules")) {
        // Esto agrupa dependencias grandes por nombre de librería (ej: vendor-lucide-react)
        return id
          .toString()
          .split("node_modules/")[1]
          .split("/")[0]
          .toString();
      }
    },
  },
},
  },
});
