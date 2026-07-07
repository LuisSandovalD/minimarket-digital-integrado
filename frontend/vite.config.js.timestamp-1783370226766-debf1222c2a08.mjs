// vite.config.js
import tailwindcss from "file:///app/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "file:///app/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///app/vite.config.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    // Evita que Vite cambie de puerto si encuentra interferencia
    // Permite que la recarga en vivo viaje a través de Nginx (Puerto 80)
    hmr: {
      clientPort: 80,
      protocol: "ws"
      // Asegura que se use el protocolo de WebSocket estándar
    },
    // Activa la vigilancia forzada de archivos dentro del contenedor
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ["**/node_modules/**", "**/dist/**"]
      // Evita sobrecargar el disco de Docker
    }
  },
  // 🔥 ESTO SOLUCIONA EL "CONNECTION RESET BY PEER" (Saturación de Nginx)
  // Fuerza a Vite a empaquetar previamente las dependencias grandes (lucide-react, emoji-picker, etc.)
  // en lugar de enviarlas como miles de pequeños archivos sueltos a Nginx.
  optimizeDeps: {
    include: ["lucide-react", "emoji-picker-react", "react", "react-dom"],
    disabled: false
  },
  preview: {
    host: "0.0.0.0",
    port: 4173
  },
  build: {
    outDir: "dist",
    sourcemap: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJ1cmxcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5cbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB0YWlsd2luZGNzcygpXSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG5cbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgcG9ydDogNTE3MyxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLCAvLyBFdml0YSBxdWUgVml0ZSBjYW1iaWUgZGUgcHVlcnRvIHNpIGVuY3VlbnRyYSBpbnRlcmZlcmVuY2lhXG4gICAgLy8gUGVybWl0ZSBxdWUgbGEgcmVjYXJnYSBlbiB2aXZvIHZpYWplIGEgdHJhdlx1MDBFOXMgZGUgTmdpbnggKFB1ZXJ0byA4MClcbiAgICBobXI6IHtcbiAgICAgIGNsaWVudFBvcnQ6IDgwLFxuICAgICAgcHJvdG9jb2w6IFwid3NcIiwgLy8gQXNlZ3VyYSBxdWUgc2UgdXNlIGVsIHByb3RvY29sbyBkZSBXZWJTb2NrZXQgZXN0XHUwMEUxbmRhclxuICAgIH0sXG4gICAgLy8gQWN0aXZhIGxhIHZpZ2lsYW5jaWEgZm9yemFkYSBkZSBhcmNoaXZvcyBkZW50cm8gZGVsIGNvbnRlbmVkb3JcbiAgICB3YXRjaDoge1xuICAgICAgdXNlUG9sbGluZzogdHJ1ZSxcbiAgICAgIGludGVydmFsOiAxMDAsXG4gICAgICBpZ25vcmVkOiBbXCIqKi9ub2RlX21vZHVsZXMvKipcIiwgXCIqKi9kaXN0LyoqXCJdLCAvLyBFdml0YSBzb2JyZWNhcmdhciBlbCBkaXNjbyBkZSBEb2NrZXJcbiAgICB9LFxuICB9LFxuXG4gIC8vIFx1RDgzRFx1REQyNSBFU1RPIFNPTFVDSU9OQSBFTCBcIkNPTk5FQ1RJT04gUkVTRVQgQlkgUEVFUlwiIChTYXR1cmFjaVx1MDBGM24gZGUgTmdpbngpXG4gIC8vIEZ1ZXJ6YSBhIFZpdGUgYSBlbXBhcXVldGFyIHByZXZpYW1lbnRlIGxhcyBkZXBlbmRlbmNpYXMgZ3JhbmRlcyAobHVjaWRlLXJlYWN0LCBlbW9qaS1waWNrZXIsIGV0Yy4pXG4gIC8vIGVuIGx1Z2FyIGRlIGVudmlhcmxhcyBjb21vIG1pbGVzIGRlIHBlcXVlXHUwMEYxb3MgYXJjaGl2b3Mgc3VlbHRvcyBhIE5naW54LlxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXCJsdWNpZGUtcmVhY3RcIiwgXCJlbW9qaS1waWNrZXItcmVhY3RcIiwgXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gIH0sXG5cbiAgcHJldmlldzoge1xuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHBvcnQ6IDQxNzMsXG4gIH0sXG5cbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOEwsT0FBTyxpQkFBaUI7QUFDdE4sT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLG9CQUFvQjtBQUptRixJQUFNLDJDQUEyQztBQU1qSyxJQUFNLGFBQWEsY0FBYyx3Q0FBZTtBQUNoRCxJQUFNLFlBQVksS0FBSyxRQUFRLFVBQVU7QUFFekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7QUFBQSxFQUVoQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxXQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQTtBQUFBO0FBQUEsSUFFWixLQUFLO0FBQUEsTUFDSCxZQUFZO0FBQUEsTUFDWixVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxzQkFBc0IsWUFBWTtBQUFBO0FBQUEsSUFDOUM7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsZ0JBQWdCLHNCQUFzQixTQUFTLFdBQVc7QUFBQSxJQUNwRSxVQUFVO0FBQUEsRUFDWjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
