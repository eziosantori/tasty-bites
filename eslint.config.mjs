import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

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
      "unused-imports": unusedImports
    },
    rules: {
      "indent": ["warn", 2], // Indentazione di 2 spazi
      "import/order": ["warn", {
        "groups": [["builtin", "external", "internal"]],
        "newlines-between": "always"
      }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": "error",
      "unused-imports/no-unused-imports": "warn"
    }
  },
];

export default eslintConfig;
