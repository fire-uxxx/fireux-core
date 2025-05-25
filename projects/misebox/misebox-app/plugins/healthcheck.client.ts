export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV !== "development") return;

  // 1. HMR/Dev Server status
  if (import.meta.hot) {
    console.info("[HealthCheck] HMR is enabled.");
  } else {
    console.warn("[HealthCheck] HMR is NOT enabled!");
  }

  // 2. Console log watcher count
  setTimeout(() => {
    // Vue exposes __VUE_DEVTOOLS_GLOBAL_HOOK__ in dev
    const watchers = (window as any)?.__VUE_DEVTOOLS_GLOBAL_HOOK__?.apps?.[0]
      ?.instanceMap?.size;
    if (typeof watchers === "number") {
      console.info(`[HealthCheck] Vue watcher count: ${watchers}`);
    }
  }, 2000);

  // 3. Check for excessive console.log
  const origLog = console.log;
  let logCount = 0;
  console.log = function (...args) {
    logCount++;
    if (logCount === 20) {
      origLog("[HealthCheck] More than 20 console.log calls detected!");
    }
    return origLog.apply(console, args);
  };

  // 4. Check for large product lists
  window.addEventListener("DOMContentLoaded", () => {
    const productLists = document.querySelectorAll(".product-list");
    productLists.forEach((list) => {
      const count = list.querySelectorAll("[data-product-card]").length;
      if (count > 50) {
        console.warn(
          `[HealthCheck] Large product list detected: ${count} items. Consider pagination or virtualization.`
        );
      }
    });
  });

  // 5. Network requests (basic)
  const origFetch = window.fetch;
  window.fetch = function (...args) {
    return origFetch.apply(this, args);
  };
});
