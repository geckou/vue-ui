module.exports = {
  root         : true,
  parser       : 'vue-eslint-parser',
  parserOptions: {
    parser             : '@typescript-eslint/parser',
    ecmaVersion        : 2020,
    sourceType         : 'module',
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    node   : true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    curly         : ['error', 'multi-line'],
    'comma-dangle': ['error', 'always-multiline'],
    'key-spacing' : ['error', {
      align: 'colon',
    }],
    'no-multi-spaces': ['error', {
      exceptions: { VariableDeclarator: true },
    }],
    'space-before-function-paren'   : ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation'     : ['error', 'never', {
      ignore: ['custom-prop'],
    }],
    'vue/v-on-event-hyphenation': ['error', 'never', {
      autofix: false,
    }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}