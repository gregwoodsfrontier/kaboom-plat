import { defineConfig } from 'vite'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public",
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './public')
    },
  },
})