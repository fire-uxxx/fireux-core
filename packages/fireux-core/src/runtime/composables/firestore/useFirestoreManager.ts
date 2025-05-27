// ~/composables/useFirestoreManager.ts

import { useCurrentUser } from "vuefire";
import { useFirestoreRead } from "./useFirestoreRead";
import { useFirestoreCreate } from "./useFirestoreCreate";
import { useFirestoreUpdate } from "./useFirestoreUpdate";
import { useFirestoreDelete } from "./useFirestoreDelete";
import { useFirestoreUtils } from "./useFirestoreUtils";

export function useFirestoreManager() {
  const currentUser = useCurrentUser();

  async function waitForCurrentUser() {
    while (!currentUser.value) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return currentUser.value;
  }

  return {
    waitForCurrentUser,
    ...useFirestoreRead(),
    ...useFirestoreCreate(),
    ...useFirestoreUpdate(),
    ...useFirestoreDelete(),
    ...useFirestoreUtils(),
  };
}
