// packages/fireux-core/nuxt-config/shared.ts
export const fireuxDefaults = {
  srcDir: "app/",
  ssr: true,
  css: ["~/assets/css/main.css", "~/assets/design-system/main.scss"],
  modules: ["@nuxt/ui", "nuxt-vuefire", "@vite-pwa/nuxt", "@nuxt/image"],
  imports: {
    dirs: ["composables/**/**", "models/**/**", "utils/**/**"],
  },
  nitro: {
    preset: "firebase",
    firebase: { gen: 2 },
    devServer: {},
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2025-03-17",
  build: {
    transpile: ["reka-ui"],
  },
};
