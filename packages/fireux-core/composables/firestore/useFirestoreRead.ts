import { useCollection, useDocument, useFirestore } from "vuefire";
import {
  collection,
  doc,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { useFirestoreManager } from "@fireux/core";
import type { Ref } from "vue";

export function useFirestoreRead() {
  const db = useFirestore();
  const { useRuntimeConfig } = require("#imports");
  const {
    public: { tenantId },
  } = useRuntimeConfig();

  async function firestoreFetchCollection<T>(
    collectionName: string
  ): Promise<{ collectionData: Ref<T[] | undefined> }> {
    const { waitForCurrentUser } = useFirestoreManager();
    await waitForCurrentUser();

    const colRef = query(
      collection(db, collectionName),
      // To support multi-tenant objects in the future, replace with:
      // where('tenant_ids', 'array-contains', tenantId)
      where("tenant_id", "==", tenantId)
    );

    const { data: collectionData } = useCollection<T>(colRef, {
      ssrKey: collectionName,
    });

    return { collectionData };
  }

  async function firestoreFetchDoc<T>(
    collectionName: string,
    id: string
  ): Promise<Ref<T | null | undefined>> {
    const { waitForCurrentUser } = useFirestoreManager();
    await waitForCurrentUser();

    const docRef = doc(db, collectionName, id);
    const { data } = useDocument<T>(docRef);
    return data;
  }

  async function firestoreQueryOneByField<T>(
    collectionName: string,
    field: string,
    value: string
  ): Promise<T | null> {
    const { waitForCurrentUser } = useFirestoreManager();
    await waitForCurrentUser();

    const q = query(
      collection(db, collectionName),
      // To support multi-tenant objects in the future, replace with:
      // where('tenant_ids', 'array-contains', tenantId)
      where("tenant_id", "==", tenantId),
      where(field, "==", value),
      limit(1)
    );

    const snapshot = await getDocs(q);
    const docSnap = snapshot.docs[0];

    return docSnap ? ({ id: docSnap.id, ...docSnap.data() } as T) : null;
  }

  async function firestoreFetchSubcollection<T>(
    parentCollection: string,
    parentId: string,
    subcollection: string
  ): Promise<T[]> {
    const { waitForCurrentUser } = useFirestoreManager();
    await waitForCurrentUser();

    const subRef = collection(db, parentCollection, parentId, subcollection);
    const snapshot = await getDocs(subRef);
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  return {
    firestoreFetchCollection,
    firestoreFetchDoc,
    firestoreQueryOneByField,
    firestoreFetchSubcollection,
  };
}
