const js = require("@eslint/js");
const globals = require("globals");

module.exports = [

    {
        ignores: [
            "node_modules",
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

            quotes: [
                "error",
                "double",
            ],

            semi: [
                "error",
                "always",
            ],

            "no-unused-vars": "off",

        },

    },

];