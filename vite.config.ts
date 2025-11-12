
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  

  server: {
    host: true,
    port: 5173,
    allowedHosts: ["47bf97c6784f.ngrok-free.app"],
  },

});
