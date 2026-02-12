import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        food: resolve(__dirname, 'src/pages/food/index.html'),
        about: resolve(__dirname, 'src/pages/about/index.html'),
        thingstodo: resolve(__dirname, 'src/pages/things-to-do/index.html'),
        nightlife: resolve(__dirname, 'src/pages/nightlife/index.html'),
        armymap: resolve(__dirname, 'src/pages/armymap/index.html'),
        events: resolve(__dirname, 'src/pages/events/index.html')

        // add any other pages here
      },
    },
  },
})