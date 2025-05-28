import { defineNuxtConfig } from 'nuxt/config'

// per‑app PWA configuration
const pwaConfig = {
  registerType: 'autoUpdate',
  manifest: {
    name: process.env.APP_NAME,
    short_name: process.env.APP_SHORT_NAME,
    start_url: '/',
    display: 'standalone',
    theme_color: process.env.APP_THEME_COLOR,
    background_color: process.env.APP_BACKGROUND_COLOR,
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  workbox: {
    navigateFallback: '/',
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    skipWaiting: true,
    globPatterns: ['**/*.{js,css,html,png,svg,ico,json,txt,woff2}']
  },
  devOptions: {
    enabled: process.env.NODE_ENV === 'development',
    suppressWarnings: true,
    navigateFallbackAllowlist: [/^\/$/],
    type: 'module'
  }
}

// per‑app runtime configuration
const runtimeConfig = {
  public: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    domain: process.env.DOMAIN,
    tenantId: process.env.TENANT_ID,
    appName: process.env.APP_NAME,
    appShortName: process.env.APP_SHORT_NAME,
    appThemeColor: process.env.APP_THEME_COLOR,
    appIcon: process.env.APP_ICON,
    nodeEnv: process.env.NODE_ENV
  },
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET
}

export default defineNuxtConfig({
  srcDir: 'app/',
  ssr: true,

  css: [
    '~/assets/css/main.css',
    '~/assets/css/app.css',
    '~/assets/design-system/main.scss'
  ],

  modules: [
    '@nuxt/ui',
    'nuxt-vuefire',
    '@vite-pwa/nuxt',
    '@nuxt/image',
    ['@vite-pwa/nuxt', pwaConfig]
  ],

  imports: {
    dirs: ['composables/**', 'models/**', 'utils/**']
  },

  nitro: {
    preset: 'firebase',
    firebase: { gen: 2 },
    devServer: {}
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-03-17',

  build: {
    transpile: ['reka-ui']
  },

  plugins: [
    '~/plugins/fireux-core-config.ts',
    '~/plugins/firebase.client.js',
    '~/plugins/inject-tracer.ts',
    '~/plugins/healthcheck.client.ts',
    '~/plugins/fireux-config.ts',
    '~/plugins/local-plugin.ts'
  ],

  runtimeConfig
})
