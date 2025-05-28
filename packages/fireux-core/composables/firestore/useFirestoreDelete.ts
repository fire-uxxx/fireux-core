import { doc, deleteDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useFirestoreManager } from "@fireux/core";

export function useFirestoreDelete() {
  const db = useFirestore();

  async function deleteDocument(collectionName: string, documentId: string) {
    const { waitForCurrentUser } = useFirestoreManager();

    if (!collectionName || !documentId) {
      throw new Error("Collection name and document ID are required.");
    }

    await waitForCurrentUser();
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log(`✅ Deleted document: ${documentId} from ${collectionName}`);
  }

  return { deleteDocument };
}
