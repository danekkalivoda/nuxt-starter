module.exports = {
    root: true,
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    parser: "vue-eslint-parser",
    extends: [
        "eslint:recommended",
        "airbnb-typescript/base",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:storybook/recommended",
    ],
    plugins: ["prettier", "import", "@typescript-eslint"],
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2017,
        sourceType: "module",
        extraFileExtensions: [".vue"],
        project: ["./tsconfig.json"],
    },
    settings: {
        "prettier-vue": {
            // Settings for how to process Vue SFC Blocks
            SFCBlocks: {
                template: true,
                script: true,
                style: true,
            },
            usePrettierrc: true,
            fileInfoOptions: {
                withNodeModules: false,
            },
        },
    },
    ignorePatterns: [".eslintrc.js","assets/js/**/*.*", "assets/css/tailwind.config.js","recruitis-shared/**/*.*", "js/utils/**/*.*"],
    rules: {
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "no-console": "off",
        "no-debugger": "warn",
        "no-plusplus": "off",
        "no-undef": "off",
        "no-underscore-dangle": "off",
        "@typescript-eslint/no-var-requires": "off",
        "class-methods-use-this": "off",
        "max-classes-per-file": "off",
        "no-restricted-syntax": "off",
        "arrow-parens": "off",
        "vue/max-len": [
            "warn",
            {
                code: 160,
                template: 300,
                ignoreStrings: true,
            },
        ],
        "no-continue": "off",
        "vue/multi-word-component-names": "off",
        "vue/no-reserved-component-names": "off",
/*         "import/extensions": [
            "error",
            {
                js: "always",
                // ts: "always", dela mi to pak podobne problemy jako https://github.com/cypress-io/cypress/issues/26148
                css: "always",
                vue: "always",
            },
        ], */
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        curly: ["error"],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "variable",
                format: ["camelCase", "PascalCase", "UPPER_CASE"],
                leadingUnderscore: "allow",
            },
            {
                selector: "variable",
                format: null,
                filter: {
                    regex: "^__.*_TOKEN$",
                    match: true,
                },
            },
        ],
        "prettier/prettier": [
            "error",
            {
                plugins: ["prettier-plugin-tailwindcss"],
                pluginSearchDirs: false,
                printWidth: 120,
                singleQuote: false,
                semi: true,
                trailingComma: "es5",
                tabWidth: 4,
                useTabs: false,
                arrowParens: "always",
                endOfLine: "auto",
            },
        ],
    },
};
