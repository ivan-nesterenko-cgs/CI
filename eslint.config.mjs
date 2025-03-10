import eslint from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import namingConventionPlugin from "eslint-plugin-naming-convention";
import perfectionist from "eslint-plugin-perfectionist";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  eslint.configs.recommended,
  perfectionist.configs["recommended-natural"],
  {
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/*d.ts",
      "**/build",
      "**/migrations",
      "**/eslint.config.mjs",
      "**/tailwind.config.js",
      "**/.yarn",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2023,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "naming-convention": namingConventionPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase"],
          selector: ["objectLiteralProperty"],
        },
        {
          format: ["UPPER_CASE"],
          selector: ["enumMember"],
        },
        {
          format: ["PascalCase"],
          selector: ["typeLike", "interface"],
        },
        {
          format: ["UPPER_CASE", "PascalCase"],
          selector: ["enum"],
        },
        {
          format: ["PascalCase", "camelCase", "UPPER_CASE"],
          selector: "variableLike",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: false,
          allowTaggedTemplates: false,
          allowTernary: false,
          enforceForJSX: false,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "none",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          classes: true,
          functions: true,
          variables: true,
        },
      ],
      "arrow-body-style": ["error", "as-needed"],
      "import/named": "off",
      "new-cap": [
        "error",
        {
          capIsNew: false,
          newIsCap: true,
        },
      ],
      "no-cond-assign": ["error", "always"],
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": [
        "warn",
        {
          max: 1,
          maxEOF: 0,
        },
      ],
      "no-unused-expressions": "off",
      "no-unused-vars": "off",
      "no-use-before-define": "off",
      "no-useless-escape": "off",
      "perfectionist/sort-imports": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: true,
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
