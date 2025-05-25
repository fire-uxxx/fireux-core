import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

export function useAppEnsure() {
  const db = useFirestore()
  const { waitForCurrentUser, setDocumentWithId } = useFirestoreManager()
  const {
    public: { tenantId, appName }
  } = useRuntimeConfig()

  async function ensureApp() {
    const currentUser = await waitForCurrentUser()
    const uid = currentUser.uid

    if (!tenantId) {
      console.warn('🐶 [ensureApp] No tenantId found. Aborting.')
      return
    }

    const appDocRef = doc(db, 'apps', tenantId)
    const appSnap = await getDoc(appDocRef)

    if (appSnap.exists()) {
      const createdAt = appSnap.data()?.created_at || 'unknown date'
      console.log(
        `✅ [ensureApp] App '${tenantId}' already exists. Created on ${createdAt}.`
      )
      return
    }

    const appData: Partial<App> = {
      id: tenantId,
      app_name: appName,
      admin_ids: [uid]
    }
    // Create the app document (includes created_at, created_in automatically)
    await setDocumentWithId('apps', tenantId, appData)

    // ✅ Update Core User to reflect admin role
    const coreUserRef = doc(db, 'users', uid)
    await updateDoc(coreUserRef, {
      adminOf: arrayUnion(tenantId)
    })

    console.log(
      `🎉 [ensureApp] App '${tenantId}' created and user '${uid}' added as admin.`
    )
    return tenantId
  }

  return { ensureApp }
}
