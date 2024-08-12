// https://nuxt.com/docs/api/configuration/nuxt-config
let tailwindConfigUrl = 'sites/default/tailwind.config.js';
if (process.env.NUXT_PROJECT_NAME) {
    tailwindConfigUrl = 'sites/' + process.env.NUXT_PROJECT_NAME + '/tailwind.config.js';
}
let projectConfig;
if (process.env.NUXT_PROJECT_NAME) {
    projectConfig = require(`./sites/${process.env.NUXT_PROJECT_NAME}/config`);
} else {
    projectConfig = require('./sites/default/config');
}

export default defineNuxtConfig({
    runtimeConfig: {
        private: {
            NUXT_SECRET: process.env.NUXT_SECRET,
            STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
        },
        public: {
            NUXT_PROJECT_NAME: process.env.NUXT_PROJECT_NAME,
        },
    },
    modules: [
        '@sidebase/nuxt-auth',
        [
            '@nuxtjs/eslint-module',
            {
                lintOnStart: false,
            },
        ],
        '@nuxtjs/google-fonts',
        '@nuxtjs/i18n',
        '@nuxt/icon',
        '@nuxtjs/strapi',
        'nuxtjs-naive-ui',
    ],
    devtools: { enabled: false },
    ssr: true,
    css: ['~/assets/css/tailwind.css'],
    postcss: {
        plugins: {
            'postcss-import': {},
            'tailwindcss/nesting': 'postcss-nesting',
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
        '@ui': '/recruitis-shared',
        '@sites': '/sites',
        '@src/assets/js/utils': '/recruitis-shared/utils',
        '@utils': '/recruitis-shared/utils',
        '@/js/UI/components/': '/recruitis-shared/components',
        '@/js/utils': '/recruitis-shared/utils',
        'tailwind-config': '/' + tailwindConfigUrl,
    },
    auth: {
        baseURL: process.env.AUTH_ORIGIN,
        globalAppMiddleware: false,
        provider: {
            type: 'authjs',
        },
    },
    strapi: {
        url: 'http://127.0.0.1:1337',
        prefix: '/api',
        version: 'v4',
        cookie: {},
        cookieName: 'strapi_jwt',
    },
    /* typescript: {
        typeCheck: true,
        strict: false,
    }, */
    plugins: ['~/plugins/naive-ui'],
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
                : ['@juggle/resize-observer'],
    },
});
