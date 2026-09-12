import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        practice: resolve(__dirname, 'practice.html'),
        research: resolve(__dirname, 'research.html'),
        achievements: resolve(__dirname, 'achievements.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
