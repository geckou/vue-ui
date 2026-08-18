import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// デモサイト（GitHub Pages）用の設定
// リポジトリ配下に公開するため base は /vue-ui/ 。ルートで公開する場合は BASE_PATH=/ を指定
const base = process.env.BASE_PATH ?? '/vue-ui/'

export default defineConfig({
  root   : resolve(__dirname, 'demo'),
  base,
  plugins: [vue()],

  server: {
    host: '0.0.0.0',
    port: 5555,
  },

  optimizeDeps: {
    include: ['vue'],
  },

  resolve: {
    alias: {
      '@'    : resolve(__dirname, 'src'),
      '~demo': resolve(__dirname, 'demo'),
    },
  },

  build: {
    outDir     : resolve(__dirname, 'demo-dist'),
    emptyOutDir: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
