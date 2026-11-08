import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /<repo-name>/. Override with BASE_PATH
// (e.g. BASE_PATH=/ for a custom domain or a user site).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/umair-website/',
  plugins: [react(), tailwindcss()],
})
