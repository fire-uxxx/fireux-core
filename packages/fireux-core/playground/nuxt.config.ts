export default defineNuxtConfig({
  modules: ["@fireux/core"],
  fireux: {}, // ✅ use the correct configKey here
  devtools: { enabled: true },
  nitro: {
    compatibilityDate: "2025-05-27",
  },
  vite: {
    server: {
      fs: {
        allow: [
          "..", // allow access to fireux-core (parent)
          "../../..", // allow access to monorepo root (if needed)
        ],
      },
    },
  },
});
