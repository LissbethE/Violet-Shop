import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import http from 'https';

// import the plugin
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // setup the plugin
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],

  server: {
    // proxy requests prefixed '/api' and '/uploads'
    proxy: {
      '/uploads': {
        target: 'https://violetshop.onrender.com',
        changeOrigin: true,
        secure: false,
        agent: new http.Agent(),
      },

      '/api': {
        target: 'https://violetshop.onrender.com',
        changeOrigin: true,
        secure: false,
        agent: new http.Agent(),
      },
    },
  },
});
