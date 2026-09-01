import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/portofolio/' : './',
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  server: {
    port: 3000,
    open: false,
  },
});
