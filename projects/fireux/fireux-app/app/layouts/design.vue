<template>
  <div class="design-layout">
    <div class="pinstripe-background" />
    <main class="content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
/* ✅ Pinstripe Background - Unique to this layout */
.pinstripe-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-image: linear-gradient(var(--ui-primary) 1px, transparent 1px),
    linear-gradient(90deg, var(--ui-primary) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}
</style>
