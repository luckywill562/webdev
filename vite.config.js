import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  root: './static',
  base: '/assets/',
  build: {
    outDir: '../web/assets',
    assetsDir: '',
    manifest: true,
    rollupOptions: {
      input : {
        main: resolve(__dirname,'./static/js/main.jsx'),
        app: resolve(__dirname, './static/js/admin.jsx'),
      },
      
    }
  }
})
