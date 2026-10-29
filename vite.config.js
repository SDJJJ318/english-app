import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages 部署在 /仓库名/ 子路径下
  base: './',
})
