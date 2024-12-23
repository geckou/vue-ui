import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath    : './tsconfig.json',
      outDir          : 'dist',
      insertTypesEntry: true,
    }),
  ],

  server: {
    host: '0.0.0.0',
    port: 5555,
  },

  build: {
    lib: {
      entry   : resolve(__dirname, 'src/index.ts'),
      name    : 'VueUIComponents',
      fileName: format => `vue-ui-components.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output  : {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

  optimizeDeps: {
    include: ['vue'],
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
})