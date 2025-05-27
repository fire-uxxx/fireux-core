// 🔧 GitHub Copilot Instructions:
// This is a Nuxt 3 module called fireux-core inside a monorepo.
// The module should register composables from ./runtime/composables (future).
// It should also allow adding plugins, middleware, etc. from runtime/.
// Keep the code minimal and idiomatic for Nuxt 3.
// Playground app in ./playground is used to test the module.

// This is a Nuxt 3 module using @nuxt/kit.
// Auto-import composables from `runtime/composables`.
// Use TypeScript with full type inference from @nuxt/schema and @nuxt/kit.
// Assume this runs in a monorepo workspace called `@fireux/core`.
// Stick to Nuxt conventions and keep it minimal.
// Only export what is needed by Nuxt runtime or developer users.

import { defineNuxtModule, createResolver, addImportsDir } from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addImportsDir(resolver.resolve("./runtime/composables"));
  },
});
