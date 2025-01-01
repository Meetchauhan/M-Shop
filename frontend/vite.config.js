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
    host: "0.0.0.0", // Bind to all network interfaces
    port: parseInt(process.env.PORT) || 5000, // Use Render's PORT environment variable if available
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Correct the URL format (add `http://`)
        changeOrigin: true,
        secure: false, // Disable SSL verification for local proxy
      },
    },
  },
  preview: {
    host: "0.0.0.0", // Bind preview to all network interfaces
    port: parseInt(process.env.PORT) || 5000, // Use Render's PORT for preview
  },
});
