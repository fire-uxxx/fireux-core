
export function useDocOperations() {
  const firestoreManager = useFirestoreManager()

  async function createDoc(collectionName, data, docId = null) {
    return firestoreManager.createDocument(collectionName, data, docId)
  }

  async function updateDocData(collectionName, docId, data) {
    return firestoreManager.updateDocument(collectionName, docId, data)
  }

  async function deleteDocData(collectionName, docId) {
    return firestoreManager.deleteDocument(collectionName, docId)
  }

  return {
    createDoc,
    updateDocData,
    deleteDocData
  }
}
