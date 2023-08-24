// https://nuxt.com/docs/api/configuration/nuxt-config
let tailwindConfigUrl = "sites/default/tailwind.config.js";
if (process.env.NUXT_PROJECT_NAME) {
    tailwindConfigUrl = "sites/" + process.env.NUXT_PROJECT_NAME + "/tailwind.config.js";
}
let projectConfig;
if (process.env.NUXT_PROJECT_NAME) {
    projectConfig = require(`./sites/${process.env.NUXT_PROJECT_NAME}/config`);
} else {
    projectConfig = require("./sites/default/config");
}

export default defineNuxtConfig({
    runtimeConfig: {
        private: {
            NUXT_SECRET: process.env.NUXT_SECRET,
            STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
        },
        public: {},
    },
    modules: [
        "@sidebase/nuxt-auth",
        "@nuxtjs/eslint-module",
        "@nuxtjs/google-fonts",
        "@nuxtjs/i18n",
        "nuxt-icon",
        "@nuxtjs/strapi",
    ],
    devtools: { enabled: false },
    ssr: true,
    css: ["~/assets/css/tailwind.css"],
    postcss: {
        plugins: {
            "postcss-import": {},
            "tailwindcss/nesting": "postcss-nesting",
            tailwindcss: { config: tailwindConfigUrl },
            autoprefixer: {},
        },
    },
    components: {
        dirs: projectConfig.componentsPaths,
    },
    googleFonts: {
        ...projectConfig.googleFonts,
    },
    i18n: projectConfig.i18n,
    alias: {
        "@ui": "/recruitis-shared",
        "@sites": "/sites",
        "@src/assets/js/utils": "/recruitis-shared/utils",
        "@utils": "/recruitis-shared/utils",
        "@/js/UI/components/": "/recruitis-shared/components",
        "@/js/utils": "/recruitis-shared/utils",
        "tailwind-config": "/" + tailwindConfigUrl,
    },
    auth: {
        origin: process.env.AUTH_ORIGIN,
        enableGlobalAppMiddleware: true,
    },
    strapi: {
        url: process.env.STRAPI_BASE_URL || "http://localhost:1337",
        prefix: "/api",
        version: "v4",
        cookie: {},
        cookieName: "strapi_jwt",
    },
    build: {
        transpile:
            process.env.NODE_ENV === "production"
                ? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
                : ["@juggle/resize-observer"],
    },
});
