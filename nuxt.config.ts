// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    '@': './'
  },
  // Configure to serve static HTML files from public as main frontend
  nitro: {
    routeRules: {
      // Redirect root to index.html
      '/': { redirect: '/index.html' }
    }
  },
  // Keep the API endpoints active for backend functionality
  ssr: false
})
