import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  plugins: [
    react(),
    tailwindcss()
  ], //using offical react plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), //instaed of src folder importing we can use @/components/register
    },
  },

  server: {
    host: "localhost",//frontend host
    port: 3000,//forntend server running port
    // Avoid cors error we give this 
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
      },
    },
  },
});
