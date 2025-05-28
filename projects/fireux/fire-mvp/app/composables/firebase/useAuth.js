// composables/firebase/useAuth.js (FIReMVP)

export function useAuth() {
  const currentUser = useCurrentUser()

  const authState = computed(() =>
    currentUser.value ? 'AUTHENTICATED' : 'NOT_AUTHENTICATED'
  )

  return {
    currentUser,
    authState
  }
}
