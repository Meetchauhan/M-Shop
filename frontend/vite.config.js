import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/styles/variables.scss';`,
      },
    },
  },
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http:localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
