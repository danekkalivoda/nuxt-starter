module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs'],
  env: {
      browser: true,
      es2017: true,
      node: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
      'eslint:recommended',
      'airbnb-typescript/base',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:storybook/recommended'
  ],
  plugins: ['import', '@typescript-eslint', 'tailwindcss'],
  parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2017,
      sourceType: 'module',
      extraFileExtensions: ['.vue'],
      project: ['./tsconfig.json'],
  },
  rules: {
      indent: ['error', 4, {
          SwitchCase: 1,
      }],
      '@typescript-eslint/indent': ['error', 4, {
          SwitchCase: 1,
      }],
      'vue/html-indent': ['error', 4],
      'no-console': ['error', {
          allow: ['warn', 'error'],
      }],
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',
      'arrow-parens': ['error', 'always'],
      'vue/max-len': ['warn', {
          code: 160,
          template: 300,
          ignoreStrings: true,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreHTMLAttributeValues: true,
          ignoreRegExpLiterals: true,
          ignoreTemplateLiterals: true,
      }],
      'no-continue': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'import/extensions': ['error', {
          js: 'always',
          // ts: 'always', dela mi to pak podobne problemy jako https://github.com/cypress-io/cypress/issues/26148
          css: 'always',
          vue: 'always',
      }],
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      curly: ['error'],
      '@typescript-eslint/naming-convention': ['error', {
          selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'], leadingUnderscore: 'allow',
      }, {
          selector: 'variable', format: null, filter: {
              regex: '^__.*$', match: true,
          },
      }],
      'tailwindcss/classnames-order': 'warn',
      'brace-style': 'warn',
      'vue/html-self-closing': ['error', {
          'html': { // breaks some legacy components, be careful
              'void': 'never',
              'normal': 'never',
              'component': 'never',
          },
      }],
      'no-undef': 'off',
      "@typescript-eslint/no-explicit-any": "warn"
  },
};
