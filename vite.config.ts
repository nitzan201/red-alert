import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import cesium from "vite-plugin-cesium";
import path from "path"; // Import path module

export default defineConfig({
  plugins: [react(), tailwindcss(), cesium()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // This maps '@' to the 'src' directory
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/const": path.resolve(__dirname, "./src/const"),
      "@/util": path.resolve(__dirname, "./src/util"),
      "@/viewer": path.resolve(__dirname, "./src/viewer"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@context": path.resolve(__dirname, "./src/context"),
    },
  },
});
