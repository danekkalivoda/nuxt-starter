// https://nuxt.com/docs/api/configuration/nuxt-config
let tailwindConfigUrl = 'sites/default/tailwind.config.js';
if (process.env.NUXT_PROJECT_NAME) {
    tailwindConfigUrl = 'sites/' + process.env.NUXT_PROJECT_NAME + '/tailwind.config.js';
}
let projectConfig;
if (process.env.NUXT_PROJECT_NAME) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- it is ok
    projectConfig = require(`./sites/${process.env.NUXT_PROJECT_NAME}/config`);
} else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- it is ok
    projectConfig = require('./sites/default/config');
}

export default defineNuxtConfig({
    app: {
        pageTransition: false,
        layoutTransition: false,
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
            ],
        },
    },
    runtimeConfig: {
        private: {
            NUXT_SECRET: process.env.NUXT_SECRET,
            STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
        },
        public: {
            NUXT_PROJECT_NAME: process.env.NUXT_PROJECT_NAME,
            NUXT_PROJECT_CONFIG: projectConfig,
        },
    },
    modules: [
        'nuxtjs-naive-ui',
        '@primevue/nuxt-module',
        '@nuxt/icon',
        'nuxt-splide',
        'floating-vue/nuxt',
        '@sidebase/nuxt-auth',
        '@nuxtjs/google-fonts',
        '@nuxtjs/i18n',
        '@nuxtjs/strapi',
        '@nuxt/eslint',
    ],
    splide: {
        theme: 'core',
    },
    eslint: {
        checker: {
            configType: 'eslintrc',
            lintOnStart: false,
        },
    },
    devtools: { enabled: false },
    ssr: true,
    css: ['~/assets/css/tailwind.css'],
    postcss: {
        plugins: {
            'postcss-import': {},
            'tailwindcss/nesting': 'postcss-nesting',
            'tailwindcss': { config: tailwindConfigUrl },
            'autoprefixer': {},
        },
    },
    primevue: {
        autoImport: false,
        options: {
            unstyled: true,
        },
    },
    imports: {
        dirs: ['types'],
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
        url: process.env.STRAPI_BASE_URL,
        prefix: '/api',
        version: 'v4',
        cookie: {},
        cookieName: 'strapi_jwt',
    },
    typescript: {
        typeCheck: false,
        strict: false,
        tsConfig: {
            compilerOptions: {
                types: ['@types/node', './types'],
            },
        },
    },
    vite: {
        esbuild: {
            legalComments: 'none',
        },
        build: {
            terserOptions: {
                format: {
                    comments: false,
                },
            },
        },
    },
    plugins: ['~/plugins/naive-ui'],
    build: {
        transpile:
            process.env.NODE_ENV === 'production'
                ? [
                    '@vueform/multiselect',
                    'naive-ui',
                    'vueuc',
                    '@css-render/vue3-ssr',
                    '@juggle/resize-observer',
                ]
                : [
                    '@vueform/multiselect',
                    '@juggle/resize-observer',
                ],
    },
});
