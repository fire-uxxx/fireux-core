// ~/composables/useCoreUser.js

import { computed } from 'vue'
import type { CoreUser } from '@fireux/core'
import { doc } from 'firebase/firestore'
import { useDocument, useCurrentUser, useFirestore } from 'vuefire'
import type { DocumentReference } from 'firebase/firestore'
import { useCoreUserEnsure } from './useCoreUserEnsure'
import { useCoreUserUpdate } from './useCoreUserUpdate'
import { useCoreUserDelete } from './useCoreUserDelete'

export async function useCoreUser() {
  const db = useFirestore()
  const currentUser = useCurrentUser()

  const coreUserDocRef = computed<DocumentReference<CoreUser> | null>(() =>
    currentUser.value ? doc(db, 'users', currentUser.value.uid) as DocumentReference<CoreUser> : null
  )

  const { data: coreUser } = useDocument<CoreUser>(coreUserDocRef)

  return {
    coreUser,
    ...(await useCoreUserEnsure()),
    ...(await useCoreUserUpdate()),
    ...(await useCoreUserDelete())
  }
}
