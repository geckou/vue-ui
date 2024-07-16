module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'vue/html-indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'arrow-parens': ['error', 'as-needed'],
    curly         : ['error', 'multi-line'],
    'comma-dangle': ['error', 'always-multiline'],
    'key-spacing' : ['error', {
      align: 'colon',
    }],
    'no-multi-spaces': ['error', {
      exceptions: { VariableDeclarator: true },
    }],
    'no-floating-decimal'           : 'off',
    'space-before-function-paren'   : ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    'vue/attribute-hyphenation'     : ['error', 'never', {
      ignore: ['custom-prop'],
    }],
    'vue/v-on-event-hyphenation': ['error', 'never', {
      'autofix': false,
    }],
  },
}