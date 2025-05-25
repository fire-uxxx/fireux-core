import { doc, setDoc } from "firebase/firestore";
import { useFirestore as vuefireFirestore } from "vuefire";
import { useFirestoreManager } from "@fireux/core";

export function useFirestoreCreate() {
  const db = vuefireFirestore();
  const { useRuntimeConfig } = require("#imports");
  const {
    public: { tenantId },
  } = useRuntimeConfig();

  async function setDocumentWithId(
    collectionName: string,
    documentId: string,
    data: Record<string, unknown>,
    includeUser: boolean = true
  ): Promise<string> {
    const baseData: Record<string, unknown> = {
      tenant_id: tenantId,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (includeUser) {
      const { waitForCurrentUser } = useFirestoreManager();
      const currentUser = await waitForCurrentUser();
      baseData.created_by = currentUser.uid;
    }

    try {
      await setDoc(doc(db, collectionName, documentId), baseData);
      console.log(
        `[createDocumentWithId] ✅ Created document in '${collectionName}' with ID: ${documentId}`
      );
      return documentId;
    } catch (error) {
      console.error(
        `[createDocumentWithId] ❌ Error creating document in '${collectionName}':`,
        error
      );
      throw error;
    }
  }

  async function addDocumentWithId(
    collectionName: string,
    data: Record<string, unknown>,
    includeUser: boolean = true
  ): Promise<string> {
    const baseData: Record<string, unknown> = {
      tenant_id: tenantId,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (includeUser) {
      const { waitForCurrentUser } = useFirestoreManager();
      const currentUser = await waitForCurrentUser();
      baseData.created_by = currentUser.uid;
    }

    try {
      const { addDoc, collection } = await import("firebase/firestore");
      const docRef = await addDoc(collection(db, collectionName), baseData);
      console.log(
        `[addDocumentWithId] ✅ Created document in '${collectionName}' with ID: ${docRef.id}`
      );
      return docRef.id;
    } catch (error) {
      console.error(
        `[addDocumentWithId] ❌ Error adding document to '${collectionName}':`,
        error
      );
      throw error;
    }
  }
  /**
   * The parent must provide the full object shape for Core User creation.
   */

  return {
    setDocumentWithId,
    addDocumentWithId,
  };
}
