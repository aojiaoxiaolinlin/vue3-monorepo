import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTypography,
  presetUno,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno(),
    presetMini(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ],
  shortcuts: [{ "flex-center": "flex justify-center items-center" }],
  transformers: [
    transformerDirectives(),
  ],
});
