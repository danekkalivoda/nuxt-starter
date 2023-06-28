// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@sidebase/nuxt-auth", "@nuxtjs/eslint-module"],
    devtools: { enabled: false },
    css: ["~/assets/css/tailwind.css"],
    postcss: {
        plugins: {
            "postcss-import": {},
            "tailwindcss/nesting": "postcss-nesting",
            tailwindcss: { config: "assets/css/tailwind.config.js" },
            autoprefixer: {},
        },
    },
    auth: {
        origin: process.env.ORIGIN,
        enableGlobalAppMiddleware: true,
    },
    alias: {
        "@ui": "/recruitis-shared",
        "@src/assets/js/utils": "/recruitis-shared/utils",
        "@/js/UI/components/": "/recruitis-shared/components",
        "tailwind-config": "/assets/css/tailwind.config.js",
    },
    build: {
        transpile:
            process.env.NODE_ENV === "production"
                ? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
                : ["@juggle/resize-observer"],
    },
});
