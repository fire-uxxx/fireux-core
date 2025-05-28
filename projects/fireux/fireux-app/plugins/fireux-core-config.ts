// This plugin ensures FireUX Core has access to runtime config
// It must be loaded before any other plugins that use @fireux/core

import { defineNuxtPlugin } from '#app'
import { setupFireuxConfig } from '@fireux/core'

export default defineNuxtPlugin({
  name: 'fireux-core-config',
  enforce: 'pre', // Run before other plugins
  setup(nuxtApp) {
    const config = useRuntimeConfig()

    // Extract config values to pass to FireUX Core
    const coreConfig = {
      tenantId: config.public.tenantId,
      appName: config.public.appName,
      appShortName: config.public.appShortName,
      appThemeColor: config.public.appThemeColor,
      appIcon: config.public.appIcon,
      domain: config.public.domain
    }

    // Set up FireUX Core with runtime config
    setupFireuxConfig(coreConfig)

    // For debugging
    if (process.dev) {
      console.log('[FireUX Core] Config initialized:', coreConfig)
    }
  }
})
