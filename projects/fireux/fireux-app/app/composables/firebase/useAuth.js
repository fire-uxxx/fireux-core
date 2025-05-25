// ~/composables/useAuth.ts
import { computed } from 'vue'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth'

export function useAuth() {
  const auth = useFirebaseAuth()
  const currentUser = useCurrentUser()

  // const setUserTenantIdClaim = async user => {
  //   try {
  //     const functions = getFunctions()
  //     const setCustomClaims = httpsCallable(functions, 'setTenantIdClaim')
  //     await setCustomClaims({ uid: user.uid, tenantId })
  //     await user.getIdToken(true)
  //   } catch (error) {
  //     console.error('❌ Failed to set custom claims:', error.message)
  //   }
  // }

  const postProcessAuth = async user => {
    const { ensureCoreUser } = useCoreUser()
    await ensureCoreUser(user.uid, user.email ?? '') // ✅ Create Core User if missing
    // await setUserTenantIdClaim(user) // ✅ Set custom claims for tenant access
  }

  const authState = computed(() =>
    currentUser.value && !currentUser.value.isAnonymous
      ? 'AUTHENTICATED'
      : 'NOT_AUTHENTICATED'
  )

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      await postProcessAuth(result.user)
      console.log('✅ Google Sign-In Success - User:', result.user)
      return result.user
    } catch (error) {
      console.error('❌ Google Sign-In Failed:', error.message)
    }
  }

  const signInWithEmailPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await postProcessAuth(result.user)
      console.log('✅ Email Sign-In Success - User:', result.user)
      return result.user
    } catch (error) {
      console.error('❌ Email Sign-In Failed:', error.message)
      return null
    }
  }

  const signUpWithEmailPassword = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await postProcessAuth(result.user)
      console.log('✅ Email Sign-Up Success - User:', result.user)
      return result.user
    } catch (error) {
      console.error('❌ Email Sign-Up Failed:', error.message)
      return null
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
      console.log('✅ Signed out successfully')
    } catch (error) {
      console.error('❌ Sign-Out Failed:', error.message)
    }
  }

  return {
    currentUser,
    authState,
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signOutUser
  }
}
