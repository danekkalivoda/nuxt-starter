
/* eslint-disable @typescript-eslint/no-require-imports -- protože require tu chci */
import resolveConfig from 'tailwindcss/resolveConfig.js';
import defaultConfig from '~/sites/default/tailwind.config.js';

let tailwindConfig = defaultConfig;

if (process.env.NUXT_PROJECT_NAME) {
    // Dynamický import konfigurace podle projektu
    tailwindConfig = await import(`@sites/${process.env.NUXT_PROJECT_NAME}/tailwind.config.js`).then((m) => m.default);
}
export const fullConfig = resolveConfig(tailwindConfig);
