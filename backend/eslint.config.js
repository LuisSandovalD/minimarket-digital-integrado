const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: [
      "node_modules",
      "dist",
      "coverage",
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },

    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "keyword-spacing": [
        "error",
        {
          before: true,
          after: true,
        },
      ],
      "space-before-blocks": ["error", "always"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
      "arrow-spacing": [
        "error",
        {
          before: true,
          after: true,
        },
      ],

      "no-unused-vars": "off",
    },
  },
];
