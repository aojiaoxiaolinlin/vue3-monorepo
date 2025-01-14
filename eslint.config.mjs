import pluginJs from "@eslint/js";
import unocss from "@unocss/eslint-config/flat";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import parserVue from "vue-eslint-parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{vue}"] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: parserVue,
      parserOptions: {
        extraFileExtensions: [".vue"],
        parser: false,
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  unocss,
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 1,
          multiline: {
            max: 1,
          },
        },
      ],
      "vue/first-attribute-linebreak": [
        "error",
        {
          singleline: "ignore",
          multiline: "below",
        },
      ],
      "vue/html-indent": ["error", 2],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "never",
            normal: "always",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "vue/html-closing-bracket-spacing": [
        "error",
        {
          selfClosingTag: "always",
        },
      ],
      "vue/html-closing-bracket-newline": [
        "error",
        {
          singleline: "never",
          multiline: "always",
          selfClosingTag: {
            singleline: "never",
            multiline: "always",
          },
        },
      ],
      "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            ["UNIQUE", "SLOT"],
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT",
          ],
          alphabetical: false,
        },
      ],
      "vue/no-lone-template": [
        "error",
        {
          ignoreAccessible: false,
        },
      ],
      "vue/component-api-style": [
        "error",
        ["script-setup", "composition"], // "script-setup", "composition", "composition-vue2", or "options"
      ],
      "vue/prefer-true-attribute-shorthand": ["error", "always"],
      "vue/static-class-names-order": ["error"],
    },
  },
];
