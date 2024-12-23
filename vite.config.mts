import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  server: {
    host: '0.0.0.0',
    port: 5555,
  },

  build: {
    lib: {
      entry   : resolve(__dirname, 'src/index.ts'),
      name    : 'VueUIComponents',
      formats : ['es', 'cjs'],
      fileName: format => {
        if (format === 'es') return 'vue-ui-components.esm.js'
        if (format === 'cjs') return 'vue-ui-components.cjs.js'
        return `vue-ui-components.${format}.js`
      },
    },
    cssCodeSplit : true,
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
    include: ['vue'], // Vueを事前バンドル
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // @エイリアスの設定
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // SCSSモダンコンパイラ設定
      },
    },
  },
})