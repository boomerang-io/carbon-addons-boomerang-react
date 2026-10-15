import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext'
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Carbon's own SCSS still uses the deprecated Sass if() syntax; we can't fix it from here
        quietDeps: true,
        silenceDeprecations: ['if-function']
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  }
});
