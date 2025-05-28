import { computed } from "vue";
import { doc } from "firebase/firestore";
import { useFirestore, useDocument } from "vuefire";
import { useRuntimeConfig } from "nuxt/app";
import { useAppEnsure } from "./useEnsureApp";
import { useAppOnboarding } from "./useAppOnboarding";
import type { App } from "../../models/app.model";

export function useApp() {
  const {
    public: { tenantId },
  } = useRuntimeConfig();
  const db = useFirestore();

  const appDocRef = computed(() =>
    tenantId ? doc(db, "apps", tenantId) : null
  );
  const { data: app } = useDocument<App>(appDocRef);

  const isInitialised = computed(() => {
    if (app.value === undefined) return undefined;
    if (app.value === null) return false;
    return !!app.value.admin_ids?.length;
  });

  // Integrate onboarding and ensure logic
  const ensure = useAppEnsure();
  const onboarding = useAppOnboarding();

  return {
    app,
    isInitialised,
    ...ensure,
    ...onboarding,
  };
}
