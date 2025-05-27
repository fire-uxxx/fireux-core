export default defineNuxtConfig({
  modules: ["../src/module"],
  myModule: {},
  devtools: { enabled: true },
  nitro: {
    compatibilityDate: "2025-05-27",
  },
});
