<template>
  <UApp>
    <AppDebug v-if="isDevEnv" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UModal
      :open="isInitialised === false"
      prevent-close
      title="🚫 Blocked"
      description="This app needs to be initialized."
    >
      <template #body>
        <OrganismsAppOnboarding />
      </template>
    </UModal>
  </UApp>
</template>

<script setup>
import { useApp } from '@fireux/core'

const {
  public: { nodeEnv }
} = useRuntimeConfig()
const isDevEnv = nodeEnv === 'development'

useHead({
  link: [{ rel: 'manifest', href: '/manifest.webmanifest' }]
})

const { isInitialised } = useApp()
</script>

<style scoped>
/* No debug styles needed */
</style>
