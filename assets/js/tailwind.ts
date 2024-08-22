// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair -- protože require tu chci
/* eslint-disable @typescript-eslint/no-require-imports -- protože require tu chci */
import resolveConfig from 'tailwindcss/resolveConfig.js'

let tailwindConfig = require('@sites/default/tailwind.config.js')

if (process.env.NUXT_PROJECT_NAME) {
    tailwindConfig = require('@sites/' + process.env.NUXT_PROJECT_NAME + '/tailwind.config.js')
}
export const fullConfig = resolveConfig(tailwindConfig)
