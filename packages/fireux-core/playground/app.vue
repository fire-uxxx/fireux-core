<template>
  <div>
    Nuxt module playground!<br />
    {{ message }}
  </div>
</template>

<script setup>
const message = useHello();
</script>
