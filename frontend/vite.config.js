import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    force: true,
  },
  resolve: {
    alias: {
      crypto: 'node:crypto',
    },
  },
});
