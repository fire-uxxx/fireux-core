<template>
  <div class="layout-container">
    <LayoutsHeader :app-links="appLinks" :mobile-links="mobileLinks" />
    <div class="layout-content">
      <main class="layout-main-content">
        <client-only>
          <!-- <UBreadcrumb :links="breadcrumbLinks" class="layout-breadcrumbs" /> -->
        </client-only>
        <NuxtPage />
      </main>
    </div>
    <LayoutsDefaultFooter />
  </div>
</template>

<script setup>
// const breadcrumbLinks = useBreadcrumbs()
const { appLinks, mobileLinks } = useRoutes()

</script>