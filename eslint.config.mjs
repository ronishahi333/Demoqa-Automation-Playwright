import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: globals.browser
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      js
    },
    rules: {
      'semi': ['error', 'always'],
      'space-infix-ops': ['error'],
      'space-before-function-paren': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'indent': ['error', 2, { "SwitchCase": 1 }],
      'array-bracket-spacing': ['error', 'never'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'no-trailing-spaces': ['error'],
      'comma-dangle': ['error', 'only-multiline'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-blocks': ['error', 'always']
    }
  }
]);
