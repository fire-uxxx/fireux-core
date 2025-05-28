// ~/composables/firestore/useFirestoreUtils.ts
import { useFirestore } from "vuefire";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRuntimeConfig } from "nuxt/app";

export function useFirestoreUtils() {
  const db = useFirestore();
  const {
    public: { tenantId },
  } = useRuntimeConfig();

  /**
   * Checks whether a given field/value pair is unique in a collection,
   * optionally scoped to the current tenant.
   */
  async function checkUnique(
    collectionName: string,
    field: string,
    value: string,
    tenantScoped = true
  ): Promise<boolean> {
    // Build base constraint
    const constraints = [where(field, "==", value)];

    // If tenant scoping is on, grab tenantId from runtime config
    if (tenantScoped) {
      constraints.push(where("tenant_id", "==", tenantId));
    }

    // Query and return whether any docs matched
    const q = query(collection(db, collectionName), ...constraints);
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  function getCollectionPath(name: string): string {
    return `${tenantId}/${name}`;
  }

  async function fetchDocumentsByField<T>(
    collectionName: string,
    field: string,
    value: unknown
  ): Promise<T[]> {
    const constraints = [where(field, "==", value)];
    constraints.push(where("tenant_id", "==", tenantId));
    const q = query(collection(db, collectionName), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  return { checkUnique, getCollectionPath, fetchDocumentsByField };
}
