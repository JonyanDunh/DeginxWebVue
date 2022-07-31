import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteObfuscateFile} from 'vite-plugin-obfuscator'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(),viteObfuscateFile()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      /*'/proxy/bilibili/api': {
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
      },
      '/proxy/bilibili/live': {
        target: 'http://api.live.bilibili.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/bilibili\/live/, '')
      },*/



      '/proxy/bilibili/api': {
        target: 'https://t0ufn27dwf.execute-api.ap-southeast-1.amazonaws.com',
        changeOrigin: true

      },
      '/proxy/bilibili/member': {
        target: 'https://t0ufn27dwf.execute-api.ap-southeast-1.amazonaws.com',
        changeOrigin: true
      }
      ,
      '/proxy/bilibili/passport': {
        target: 'https://t0ufn27dwf.execute-api.ap-southeast-1.amazonaws.com',
        changeOrigin: true
      }
      ,
      '/api': {
        target: 'http://127.0.0.1:8000/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    manifest: true,
    minify: "terser",
  },

})
