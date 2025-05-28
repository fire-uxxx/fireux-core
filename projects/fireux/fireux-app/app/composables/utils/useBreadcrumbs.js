// COMMENT: app/composables/app/useBreadcrumbs.js
// File: composables/ui/useBreadcrumbs.ts

export function useBreadcrumbs() {
  const route = useRoute()
  const appConfig = useAppConfig()

  return computed(() => {
    // Hide breadcrumbs on the home page
    if (route.path === '/') {
      return []
    }

    // Default icons using Nuxt UI
    const homeIcon = appConfig.icon?.aliases?.home || 'u:home'
    const defaultIcon = appConfig.icon?.aliases?.link || 'u:link'

    const links = [{ label: 'Home', icon: homeIcon, to: '/' }]

    const lastMatch = route.matched[route.matched.length - 1] || {}
    const currentLabel =
      lastMatch.meta?.breadcrumb || route.name || lastMatch.name || route.path

    const currentIcon =
      (lastMatch.meta?.icon &&
        appConfig.icon?.aliases?.[lastMatch.meta.icon]) ||
      defaultIcon

    links.push({ label: currentLabel, icon: currentIcon, to: route.path })

    return links
  })
}
