import { useCollection, useDocument, useFirestore } from "vuefire";
import { collection, doc, query, where } from "firebase/firestore";
import { getTenantId } from "./utils/getTenantId";
import { useFirestoreManager } from "./useFirestoreManager";
import type { Ref } from "vue";

export function useFirestoreRead() {
  const db = useFirestore();
  const tenantId = getTenantId();
  const { waitForCurrentUser } = useFirestoreManager();

  async function firestoreFetchCollection<T>(
    name: string
  ): Promise<Ref<T[] | undefined>> {
    await waitForCurrentUser();
    const q = query(collection(db, name), where("tenant_id", "==", tenantId));
    const { data } = useCollection<T>(q, { ssrKey: name });
    return data as Ref<T[] | undefined>; // Explicitly cast the type
  }

  async function firestoreFetchDoc<T>(
    name: string,
    id: string
  ): Promise<Ref<T | undefined>> {
    await waitForCurrentUser();
    const ref = doc(db, name, id);
    const { data } = useDocument<T>(ref, { ssrKey: `${name}-${id}` });
    return data as Ref<T | undefined>; // Explicitly cast the type
  }

  return { firestoreFetchCollection, firestoreFetchDoc };
}
