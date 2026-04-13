import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules",
      "coverage",
      "config",
      "lib",
      "docs",
      "storybook-static",
      "results",
      "rollup.config.mjs"
    ]
  },
  js.configs.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.vitest,
        ...globals.node
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "testing-library": testingLibrary
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-extra-boolean-cast": "warn",
      "no-constant-binary-expression": "warn",
      "preserve-caught-error": "warn",
      "no-useless-assignment": "warn",
    }
  },
  {
    files: ["**/.stories."],
    rules: {
      "import/no-anonymous-default-export": 0,
      "no-unused-vars": "warn",
      "no-extra-boolean-cast": "warn",
      "no-constant-binary-expression": "warn",
      "preserve-caught-error": "warn",
      "no-useless-assignment": "warn",
    }
  }
];
