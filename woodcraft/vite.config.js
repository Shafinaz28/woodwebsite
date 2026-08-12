import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // Avoid OneDrive EBUSY crashes when videos/images sync
      ignored: ["**/public/**"],
    },
  },
});
