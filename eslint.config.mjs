import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import typescriptEslint from "typescript-eslint"

export default [
    js.configs.recommended,
    eslintConfigPrettier,
    ...typescriptEslint.configs.recommended,
    /*...typescriptEslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },*/
    {
        ignores: ["**/node_modules", "**/.eslint.config.mjs"],
    },
    {
        rules: {
            "no-empty-function": 0,
            "@typescript-eslint/no-empty-function": 0,
            /*"@typescript-eslint/no-floating-promises": [
                "error", { ignoreIIFE: true },
            ],
            "@typescript-eslint/no-misused-promises": "error",
            "@typescript-eslint/require-await": "error",*/
        },
    },
]
