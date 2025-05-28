import { addDoc, collection } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { getTenantId } from "./utils/getTenantId";
import { useFirestoreManager } from "./useFirestoreManager";

export function useFirestoreCreate() {
  const db = useFirestore();
  const tenantId = getTenantId();
  const { waitForCurrentUser } = useFirestoreManager();

  async function createDocument<T>(name: string, data: T): Promise<void> {
    await waitForCurrentUser();
    const ref = collection(db, name);
    await addDoc(ref, { ...data, tenant_id: tenantId });
  }

  return { createDocument };
}
