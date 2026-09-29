import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // The listing renders pre-sized static images 1:1 with plain <img> elements.
  {
    files: ["src/components/listing/**/*.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  // Node (CommonJS) scripts for the extraction / QA pipeline.
  {
    files: ["tools/**/*.js"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
