import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  base: './',
  resolve: {
    alias: {
      cesium: 'cesium'
    }
  },
  optimizeDeps: {
    include: ['cesium']
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('https://unpkg.com/cesium@1.141.0/Build/Cesium/')
  }
});