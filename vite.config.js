import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  // For GitHub Pages deployment, set base to your repo name:
  //   base: '/react/',
  // For Vercel or local dev, use default:
  base: '/',
});

