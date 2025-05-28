export default defineNuxtPlugin(() => {
  if (import.meta.dev && typeof window !== "undefined") {
    const originalWarn = console.warn;

    console.warn = (...args: unknown[]) => {
      const err = new Error();
      const stack = err.stack || "";
      const [firstArg] = args;
      const message = typeof firstArg === "string" ? firstArg : "";

      // Ignore tracer file self-logs
      if (stack.includes("inject-tracer.ts")) return;

      // Inject Warnings - Always show fully expanded
      if (message.includes("inject() can only be used")) {
        console.log(
          "%c\uD83D\uDEA8 [Vue Inject Warning]:",
          "color: orange; font-weight: bold;"
        );
        originalWarn("[Inject Warning]:", ...args);
        console.log("%c\uD83D\uDD0D Suggested Action:", "color: lightblue;");
        console.log(
          "- Review composable usage for proper setup()/plugin context."
        );
        console.trace();
      }

      // VueFire SSR Warnings - Always show fully expanded
      if (
        message.includes(
          "[VueFire SSR]: Could not get the path of the data source"
        )
      ) {
        console.log(
          "%c\u26A0\uFE0F [VueFire SSR Warning]:",
          "color: yellow; font-weight: bold;"
        );
        originalWarn("[VueFire SSR Warning]:", ...args);
        console.log("%c\uD83D\uDD0D Suggested Action:", "color: lightblue;");
        console.log(
          "- Ensure `useCollection` and `useDocument` are called after runtime config and APP_ID are available.\n" +
            "- Use <ClientOnly> or guards to prevent early calls during SSR/hydration."
        );
        console.trace();
      }

      // Always fallback to original warn for other cases
      originalWarn(...args);
    };
  }
});
