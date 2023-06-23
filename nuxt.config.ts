// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@nuxtjs/eslint-module"],
  devtools: { enabled: false },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": "postcss-nesting",
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true,
  },
});
