<template>
  <div class="main-logos">
    <!-- FIReUX Logo (Static) -->
    <a href="https://fireux.app" target="_blank">
      <img src="/img/logo.png" alt="FIReUX Logo" class="logo" >
    </a>

    <!-- GitHub Logo (Light/Dark Mode) -->
    <a href="https://github.com/fire-uxxx/fire-mvp" target="_blank">
      <img :src="isDark ? logos.github.dark : logos.github.light" alt="GitHub Logo" class="logo" >
    </a>
  </div>
</template>

<script setup>

// Detect dark mode
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// Theme-aware GitHub logo
const logos = {
  github: {
    light: '/img/github-black.png',
    dark: '/img/github-white.png'
  }
}
</script>

<style scoped>
.main-logos {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  justify-content: center;
  align-items: center;
}

.logo {
  max-height: 60px;
  width: auto;
  object-fit: contain;
}
</style>