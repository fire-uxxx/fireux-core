// FireUX/packages/fireux-core/types/fireux.d.ts
import type * as FireuxCore from "@fireux/core";

declare module "#app" {
  interface NuxtApp {
    $fireuxCore: typeof FireuxCore;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $fireuxCore: typeof FireuxCore;
  }
}
