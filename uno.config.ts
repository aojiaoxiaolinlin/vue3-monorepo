import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTypography,
  presetUno,
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
  theme: {
    colors: {
      sidebar: {
        "DEFAULT": "hsl(var(--sidebar-background))",
        "foreground": "hsl(var(--sidebar-foreground))",
        "primary": "hsl(var(--sidebar-primary))",
        "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        "accent": "hsl(var(--sidebar-accent))",
        "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        "border": "hsl(var(--sidebar-border))",
        "ring": "hsl(var(--sidebar-ring))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      accent: "hsl(var(--accent))",
    },
  },
});
