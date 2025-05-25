// ~/composables/useApp.ts
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'

export function useApp() {
  const db = useFirestore()
  const {
    public: { tenantId }
  } = useRuntimeConfig()

  const appDocRef = computed(() =>
    typeof tenantId === 'string' && tenantId.length > 0
      ? doc(db, 'apps', tenantId)
      : null
  )

  const { data: app } = useDocument<App>(appDocRef)

  const isInitialised = computed(() => {
    if (app.value === undefined) return undefined // Waiting for Firestore
    if (app.value === null) return false // App doesn't exist
    return !!app.value.admin_ids?.length // App exists, check if admin_ids populated
  })

  return {
    app,
    isInitialised,
    ...useAppEnsure(),
    ...useAppOnboarding()
  }
}
