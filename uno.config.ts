import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ]
})
