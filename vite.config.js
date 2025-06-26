import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  publicDir: "public",
  preview: {
    port: 3001,
    strictPort: false,
  },
  server: {
    port: 3001,
    strictPort: false,
    host: "localhost",
  },
});
