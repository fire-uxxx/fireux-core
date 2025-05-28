export function useAdminMetrics() {
  return {
    ...useUserMetrics(),
    ...useBlogMetrics(),
    ...useProductMetrics()
  }
}

export function exposeAdminMetrics() {
  return useAdminMetrics()
}
