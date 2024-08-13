import resolveConfig from 'tailwindcss/resolveConfig.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires -- tady ten require možná někdy nahradím
let tailwindConfig = require('@sites/default/tailwind.config.js');
if (process.env.NUXT_PROJECT_NAME) {
    tailwindConfig = require(
        '@sites/' + process.env.NUXT_PROJECT_NAME + '/tailwind.config.js',
    );
}
export const fullConfig = resolveConfig(tailwindConfig);
