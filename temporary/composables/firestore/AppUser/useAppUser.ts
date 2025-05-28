import { computed } from "vue";
import { doc } from "firebase/firestore";
import { useFirestore, useDocument, useCurrentUser } from "vuefire";
import type { DocumentReference } from "firebase/firestore";
import type { AppUserProfile } from "../../../models/user.model";
import { useAppUserUtils } from "./useAppUserUtils";
import { useAppUserEnsure } from "./useAppUserEnsure";
import { useAppUserUpdate } from "./useAppUserUpdate";
import { useRuntimeConfig } from "nuxt/app";

export function useAppUser() {
  const db = useFirestore();
  const currentUser = useCurrentUser();
  const {
    public: { tenantId },
  } = useRuntimeConfig();

  const appUserDocRef = computed<DocumentReference<AppUserProfile> | null>(() =>
    currentUser.value && tenantId
      ? (doc(
          db,
          `users/${currentUser.value.uid}/apps/${tenantId}`
        ) as DocumentReference<AppUserProfile>)
      : null
  );

  const { data: appUser } = useDocument<AppUserProfile>(appUserDocRef);

  const isAdmin = computed(() => appUser.value?.role === "admin");

  return {
    appUser,
    isAdmin,
    ...useAppUserUtils(),
    ...useAppUserEnsure(),
    ...useAppUserUpdate(),
  };
}
