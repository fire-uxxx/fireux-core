import { getDoc, doc } from 'firebase/firestore';
import { useFirestoreManager, useMediaStorage } from "@fireux/core";
import { useFirestore } from 'vuefire';
import type { CoreUser } from '@fireux/core';

export function useCoreUserEnsure() {
  const { waitForCurrentUser, setDocumentWithId } = useFirestoreManager()

  async function ensureCoreUser() {
    const currentUser = await waitForCurrentUser()
    const uid = currentUser.uid
    const collectionName = 'core-users'
    const db = useFirestore()
    const coreUserDocRef = doc(db, collectionName, uid)
    const coreUserSnap = await getDoc(coreUserDocRef)

    if (coreUserSnap.exists()) {
      const createdAt = coreUserSnap.data()?.created_at || 'unknown date'
      console.log(
        `✅ [ensureCoreUser] Core user with ID '${uid}' already exists. Continuing with established user created on ${createdAt}.`
      )
      return
    }

    const { uploadUserAvatar } = useMediaStorage()
    let avatar = currentUser?.photoURL || ''

    if (!avatar) {
      avatar = await uploadUserAvatar('img/default-avatar.png', uid)
    }

    const coreUserData: Partial<CoreUser> = {
      id: uid,
      adminOf: [],
      avatar
    }

    return await setDocumentWithId(collectionName, uid, coreUserData)
  }

  return { ensureCoreUser }
}
