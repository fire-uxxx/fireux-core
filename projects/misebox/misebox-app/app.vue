<template>
  <div>
    <h1>Misebox</h1>
    <p>{{ message }}</p>
    <p>App Initialized: {{ isInitialized }}</p>
  </div>
</template>

<script setup>
const message = useHello();
const { isInitialized } = useApp();
</script>
