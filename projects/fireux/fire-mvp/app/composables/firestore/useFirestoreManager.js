// composables/Firestore/useFirestoreManager.js
// ============================

export function useFirestoreManager() {
  return {
    ...useFirestoreCreate()
  }
}
