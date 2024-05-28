module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    "parser": "@typescript-eslint/parser" 

  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'jsdoc', 'prettier'],
  rules: {
    'no-console': 'error',
    'vue/no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'jsdoc/require-param-description': 0,
    'jsdoc/require-returns-description': 0,
  },
  "parser": "vue-eslint-parser",
};
