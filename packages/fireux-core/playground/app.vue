<template>
  <div>
    Nuxt module playground!<br />
    Hello: {{ message }}<br />
    App Initialized: {{ isInitialized }}
  </div>
</template>

<script setup>

const message = useHello();
const { isInitialized } = useApp();
</script>