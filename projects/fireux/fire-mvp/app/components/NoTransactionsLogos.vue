<template>
  <div class="no-transactions-logos">
    <a v-for="(logo, key) in logos" :key="key" :href="logo.link" target="_blank">
      <img :src="isDark ? logo.dark : logo.light" :alt="key + ' Logo'" class="logo" />
    </a>
  </div>
</template>

<script setup>

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// Centralized logo management
const logos = {
  fireux: {
    light: '/img/logo.png',
    dark: '/img/logotype.png',
    link: 'https://fireux.app'
  },
  nuxt: {
    light: '/img/nuxt-black.png',
    dark: '/img/nuxt-white.png',
    link: 'https://nuxt.com'
  },
  firebase: {
    light: '/img/firebase-black.png',
    dark: '/img/firebase-white.png',
    link: 'https://firebase.google.com'
  },
  stripe: {
    light: '/img/stripe-black.png',
    dark: '/img/stripe-white.png',
    link: 'https://stripe.com'
  },
  pwa: {
    light: '/img/pwa-black.png',
    dark: '/img/pwa-white.png',
    link: 'https://web.dev/what-are-pwas/'
  },
  github: {
    light: '/img/github-black.png',
    dark: '/img/github-white.png',
    link: 'https://github.com/fire-uxxx/fire-mvp'
  }
}
</script>

<style scoped>
.no-transactions-logos {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
  justify-content: center;
  align-items: center;
}

.logo {
  max-width: 150px;
  height: auto;
  object-fit: contain;
}
</style>