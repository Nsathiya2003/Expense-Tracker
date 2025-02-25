import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  // assetsInclude: ['**/*.html'],
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: 'localhost',
    port: 3500,
    proxy: {
      "/api": {
        //  target: "http://localhost:3500/",
        changeOrigin: true,
      },
    },
  },
});
