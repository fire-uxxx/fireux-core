// ~/composables/firestore/operations/useFirestoreUpdate.ts
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useFirestoreManager } from "@fireux/core";
import type { FieldValue } from "firebase/firestore";

export function useFirestoreUpdate() {
  const db = useFirestore();

  async function updateFirestoreDocument(
    collectionName: string,
    documentId: string,
    updates: { [key: string]: FieldValue | Partial<unknown> | undefined | null }
  ) {
    if (!collectionName || !documentId || !updates) {
      return Promise.reject(
        "❌ Collection name, document ID, and updates are required."
      );
    }

    try {
      const { waitForCurrentUser } = useFirestoreManager();
      await waitForCurrentUser();
      updates.updated_at = serverTimestamp();
      await updateDoc(doc(db, collectionName, documentId), updates);
      console.log(
        `✅ Document updated in '${collectionName}' with ID: ${documentId}`
      );
    } catch (error) {
      console.error(
        `❌ Error updating document in '${collectionName}':`,
        error
      );
      throw error;
    }
  }

  return {
    updateFirestoreDocument,
  };
}
