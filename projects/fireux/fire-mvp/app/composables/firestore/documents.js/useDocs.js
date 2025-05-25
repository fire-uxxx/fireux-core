import { useDocument, useCollection, useFirestore } from 'vuefire'
import { collection, doc } from 'firebase/firestore'

export function useDocs() {
  const db = useFirestore()
  const docOperations = useDocOperations()

  function fetchDoc(collectionName, docId) {
    if (!collectionName || !docId) return null
    return useDocument(doc(db, collectionName, docId))
  }

  function fetchCollection(collectionName) {
    if (!collectionName) return null
    return useCollection(collection(db, collectionName))
  }

  return {
    ...docOperations, // Uses the wrapped Firestore manager operations
    fetchDoc,
    fetchCollection
  }
}
