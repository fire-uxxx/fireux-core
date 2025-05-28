import { computed } from "vue";
import { doc } from "firebase/firestore";
import { useFirestore, useDocument } from "vuefire";
import { useAppEnsure } from "./useEnsureApp";
import { useAppOnboarding } from "./useAppOnboarding";
import type { App } from "../../models/app.model";

export async function useApp() {
  const db = useFirestore();
  const { useRuntimeConfig } = await import("nuxt/app");
  const {
    public: { tenantId },
  } = useRuntimeConfig();

  const appDocRef = computed(() =>
    typeof tenantId === "string" && tenantId.length > 0
      ? doc(db, "apps", tenantId)
      : null
  );

  const { data: app } = useDocument<App>(appDocRef);

  const isInitialised = computed(() => {
    if (app.value === undefined) return undefined;
    if (app.value === null) return false;
    return !!app.value.admin_ids?.length;
  });

  return {
    app,
    isInitialised,
    ...(await useAppEnsure()),
    ...(await useAppOnboarding()),
  };
}
