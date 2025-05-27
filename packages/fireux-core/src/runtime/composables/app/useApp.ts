import { ref } from "vue";

export const useApp = () => {
  const isInitialized = ref(true);
  return { isInitialized };
};
