import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [PrimeVueResolver()],
    }),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    vueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
          @use "@/assets/styles/mixins/gradients.sass" as gradients;
          @use "@/assets/styles/mixins/breakpoints.sass" as breakpoints;
        `
      },
      scss: {
        additionalData: `
          @use "@/assets/styles/mixins/gradients.sass" as gradients;
          @use "@/assets/styles/mixins/breakpoints.sass" as breakpoints;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./source', import.meta.url))
    },
  },
  server: {
    port: 5900,
  }
})
