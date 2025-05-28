import { addDoc, collection } from 'firebase/firestore'
import { useFirestore as vuefireFirestore } from 'vuefire'

export function useFirestoreCreate() {
  const db = vuefireFirestore()

  // **Create a new document with auto-generated ID**
  async function createDocument(collectionName, data) {
    if (!collectionName || !data) {
      return Promise.reject(
        '[createDocument] Collection name and data are required.'
      )
    }

    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        created_at: new Date().toISOString()
      })

      console.log(
        `[createDocument] Created document in '${collectionName}' with ID: ${docRef.id}`
      )
      return docRef.id
    } catch (error) {
      console.error(
        `[createDocument] Error creating document in '${collectionName}':`,
        error
      )
      throw error
    }
  }

  return {
    createDocument
  }
}
