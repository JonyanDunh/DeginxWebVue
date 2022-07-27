import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/proxy/bilibili/api': {
        target: 'http://api.bilibili.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/bilibili\/api/, '')

      },
      '/proxy/bilibili/member': {
        target: 'http://member.bilibili.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/bilibili\/member/, '')
      }
      ,
      '/proxy/bilibili/passport': {
        target: 'http://passport.bilibili.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/bilibili\/passport/, '')
      }
    }
  }
})
