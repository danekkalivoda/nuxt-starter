import tailwind from 'eslint-plugin-tailwindcss'
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
    stylistic.configs['all-flat'],
    eslint.configs.recommended,
    ...tailwind.configs['flat/recommended'],
    comments.recommended,
    {
        files: [
            '**/*.ts',
            '**/*.vue',
        ],
        rules: {
            'multiline-comment-style': [
                'error',
                'bare-block',
            ],
            'vue/html-indent': [
                'error',
                4,
            ],
            'no-console': [
                'error',
                {
                    allow: [
                        'warn',
                        'error',
                    ],
                },
            ],
            'no-plusplus': 'off',
            'no-undef': 'off',
            'no-underscore-dangle': 'off',
            'arrow-parens': [
                'error',
                'always',
            ],
            'vue/max-len': [
                'error',
                {
                    code: 100,
                    template: 100,
                    ignoreStrings: true,
                    ignoreComments: true,
                    ignoreUrls: true,
                    ignoreHTMLAttributeValues: true,
                    ignoreRegExpLiterals: true,
                    ignoreTemplateLiterals: true,
                },
            ],
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: {
                        max: 1,
                    },
                    multiline: {
                        max: 1,
                    },
                },
            ],
            'no-continue': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/no-reserved-component-names': 'off',
            'vue/prop-name-casing': 'off', // je to tu kuli prope __component ze strapi - muselo by se to předělat asi na interním api, aby to posilalo jen "component"
            'import/extensions': [
                'error',
                {
                    js: 'always',
                    // ts: 'always', dela mi to pak podobne problemy jako https://github.com/cypress-io/cypress/issues/26148
                    css: 'always',
                    vue: 'always',
                },
            ],
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            'curly': ['error'],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variable',
                    format: [
                        'camelCase',
                        'PascalCase',
                        'UPPER_CASE',
                    ],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'variable',
                    format: null,
                    filter: {
                        regex: '^__.*$',
                        match: true,
                    },
                },
            ],
            'tailwindcss/classnames-order': 'warn',
            'tailwindcss/no-custom-classname': 'off',
            '@eslint-community/eslint-comments/no-unused-disable': 'error',
            '@eslint-community/eslint-comments/require-description': 'error',
            'brace-style': 'warn',
            'vue/html-self-closing': [
                'error',
                {
                    html: { // breaks some legacy components, be careful
                        void: 'never',
                        normal: 'never',
                        component: 'never',
                    },
                },
            ],
        },
    },
])
