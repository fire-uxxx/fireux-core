// plugins/fireux-config.ts
import { setupFireuxConfig } from '@fireux/core'

export default defineNuxtPlugin(() => {
  const {
    public: { tenantId, appName, appShortName, appThemeColor, appIcon }
  } = useRuntimeConfig()
  setupFireuxConfig({
    tenantId,
    appName,
    appShortName,
    appThemeColor,
    appIcon
  })
})
