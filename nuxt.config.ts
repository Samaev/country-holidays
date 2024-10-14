// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias: {
    '@': '/<root_dir>'
  },
  modules: ['usebootstrap'],
  app: {
    head: {
      title: "Countries Holidays",
    }
  }
})