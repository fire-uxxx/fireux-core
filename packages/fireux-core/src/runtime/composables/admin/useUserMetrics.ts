import { computed } from "vue";
import { useAppUser } from "../firestore/AppUser/useAppUser";

export function useUserMetrics() {
  const { allAppUserProfiles } = useAppUser();

  return {
    totalUsers: computed(() => allAppUserProfiles.value?.length ?? 0),
    adminUsers: computed(
      () =>
        allAppUserProfiles.value?.filter(
          (user) => user?.value?.role === "admin"
        ).length ?? 0
    ),
    standardSubscriptions: computed(
      () =>
        allAppUserProfiles.value?.filter(
          (user) => user?.value?.subscription?.plan === "standard"
        ).length ?? 0
    ),
    proSubscriptions: computed(
      () =>
        allAppUserProfiles.value?.filter(
          (user) => user?.value?.subscription?.plan === "pro"
        ).length ?? 0
    ),
  };
}
