import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import unicorn from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      unicorn: unicorn
    },
    rules: {
      "indent": ["warn", 2], // Indentazione di 2 spazi
      "max-depth": ["warn", 4], // Warn when nesting levels exceed 4
      "import/order": ["warn", {
        "groups": [["builtin", "external", "internal"]],
        "newlines-between": "always"
      }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": "error",
      "unused-imports/no-unused-imports": "warn",
      "unicorn/no-empty-file": "error", // Mark empty files as error
      "unicorn/prefer-ternary": "warn", // Prefer module syntax
    }
  },
];

export default eslintConfig;
