// import { defineConfig } from 'vite';

// export default defineConfig({
//   optimizeDeps: {
//     force: true,
//   },
//   resolve: {
//     alias: {
//       crypto: 'node:crypto',
//     },
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
});

