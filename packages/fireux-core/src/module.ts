import { defineNuxtModule, createResolver, addImportsDir } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "@fireux/core",
    configKey: "fireux",
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // ✅ Auto-import all composables (including nested folders)
    const composablesPath = resolver.resolve("./runtime/composables");
    const appPath = resolver.resolve("./runtime/composables/app");
    const adminPath = resolver.resolve("./runtime/composables/admin");
    const firebasePath = resolver.resolve("./runtime/composables/firebase");
    const firestorePath = resolver.resolve("./runtime/composables/firestore");
    const utilsPath = resolver.resolve("./runtime/composables/utils");

    addImportsDir(composablesPath);
    addImportsDir(appPath);
    addImportsDir(adminPath);
    addImportsDir(firebasePath);
    addImportsDir(firestorePath);
    addImportsDir(utilsPath);
  },
});
