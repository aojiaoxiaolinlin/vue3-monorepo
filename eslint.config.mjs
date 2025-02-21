// eslint.config.js
import antfu from "@antfu/eslint-config";

export default antfu(
  {
    vue: {
      overrides: {
        "vue/operator-linebreak": ["error", "before"],
        "vue/multi-word-component-names": "off",
        "vue/block-order": [
          "error",
          {
            order: ["script", "template", "style"],
          },
        ],
        "vue/define-macros-order": [
          "error",
          {
            order: ["defineProps", "defineEmits"],
            defineExposeLast: false,
          },
        ],
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "vue/padding-line-between-blocks": ["error", "always"],
        "vue/prefer-use-template-ref": "error",
        "vue/require-emit-validator": "error",
        "vue/require-explicit-slots": "error",
        "vue/require-macro-variable-name": [
          "error",
          {
            defineProps: "props",
            defineEmits: "emit",
            defineSlots: "slots",
            useSlots: "slots",
            useAttrs: "attrs",
          },
        ],
      },
    },

    stylistic: {
      overrides: {
        "style/quotes": ["error", "double"],
        "style/semi": ["error", "always"],
      },
    },
  },
  {
    files: ["apps/app-one/**/*"],
    rules: {
      "no-console": "off",
    },
  },
);
