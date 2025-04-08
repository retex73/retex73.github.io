import globals from "globals";
import pluginJs from "@eslint/js";
import cypress from 'eslint-plugin-cypress/flat';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js', '!cypress/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        feather: 'readonly',
        AOS: 'readonly',
        TypeIt: 'readonly'
      }
    }
  },
  pluginJs.configs.recommended,
  {
    files: ['cypress/**/*.js'],
    ...cypress.configs.recommended
  }
];