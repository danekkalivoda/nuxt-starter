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
    modules: ["@sidebase/nuxt-auth", "@nuxtjs/eslint-module", "@nuxtjs/google-fonts"],
    devtools: { enabled: false },
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
    auth: {
        origin: process.env.ORIGIN,
        enableGlobalAppMiddleware: true,
    },
    alias: {
        "@ui": "/recruitis-shared",
        "@sites": "/sites",
        "@src/assets/js/utils": "/recruitis-shared/utils",
        "@utils": "/recruitis-shared/utils",
        "@/js/UI/components/": "/recruitis-shared/components",
        "tailwind-config": "/" + tailwindConfigUrl,
    },
    runtimeConfig: {
        apiSecret: "123",
        public: {
            strapiBase: process.env.STRAPI_URL || "default_api_url",
        },
    },
    build: {
        transpile:
            process.env.NODE_ENV === "production"
                ? ["naive-ui", "vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
                : ["@juggle/resize-observer"],
    },
});
