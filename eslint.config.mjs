import globals from "globals";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nodePlugin from "eslint-plugin-n";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,ts}"], // Target TypeScript files
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      prettier: prettierPlugin,
      n: nodePlugin,
    },
    rules: {
      "no-console": "off",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "n/no-missing-import": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "none", argsIgnorePattern: "^_" },
      ],
    },
    ignores: ["**/Direction.ts", "node_modules/*"],
  },
  prettier,
];
