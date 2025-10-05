import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    target: "esnext",
    outDir: "build",
  },

  server: {
    // ✅ Use Render’s assigned port in production, 8080 locally
    port: parseInt(process.env.PORT || "8080"),
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost",
    open: process.env.NODE_ENV !== "production",
  },

  preview: {
    // ✅ Required for Render preview environment
    port: parseInt(process.env.PORT || "10000"),
    host: "0.0.0.0",
    allowedHosts: [
      "impactor-2025.onrender.com",
      "impactor-2025-1.onrender.com",
      "localhost",
      "127.0.0.1",
      "*" // allow all other hosts for safety
    ],
  },
}));
