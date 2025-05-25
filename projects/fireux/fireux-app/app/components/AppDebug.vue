<template>
  <UCard class="debug-panel">
    <template #header>
      <div class="debug-header" @click="toggleOpen">
        🛠️ Debug Panel
        <span class="toggle-indicator">{{ isOpen ? '▼' : '▲' }}</span>
        <UButton size="xs" @click.stop="copyToClipboard">📋 Copy</UButton>
      </div>
    </template>

    <div v-if="isOpen" class="debug-content">
      <pre>{{ currentUser }}</pre>
      <pre>{{ app }}</pre>
      <pre>{{ coreUser }}</pre>
      <pre>{{ appUser }}</pre>
    </div>
  </UCard>
</template>

<script setup>
import { ref } from 'vue'

const currentUser = useCurrentUser()
const app = useApp()
const { coreUser } = useCoreUser()
const { appUser } = useAppUser()

const isOpen = ref(false)
const toggleOpen = () => { isOpen.value = !isOpen.value }

const copyToClipboard = () => {
  const content = JSON.stringify({
    currentUser: currentUser.value,
    app: app.value,
    coreUser: coreUser.value,
    appUser: appUser.value
  }, null, 2)
  navigator.clipboard.writeText(content)
}
</script>

