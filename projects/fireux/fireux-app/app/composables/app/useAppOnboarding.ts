// ~/composables/useAppOnboarding.ts

import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#imports'

interface EnvCheckResult {
  isValid: boolean;
  requiredVars: Record<string, string>;
  missingVars: string[];
}

export function useAppOnboarding() {
  const pin = ref<string[]>([])
  const isUnlocked = ref(false)
  const { coreUser } = useCoreUser()

  const showPin = computed(() => !!coreUser.value)

  const {
    public: { PIN }
  } = useRuntimeConfig()

  const envCheckResult = ref<EnvCheckResult | null>(null)
  const isEnvValid = computed(() => envCheckResult.value?.isValid ?? false)

  function checkPin() {
    if (pin.value.join('') === PIN) {
      isUnlocked.value = true
    }
  }

  async function checkEnv() {
    const { data } = await useFetch<EnvCheckResult>('/api/env-check', { server: false })
    envCheckResult.value = data.value ?? { isValid: false, requiredVars: {}, missingVars: [] }
    return envCheckResult.value
  }

  async function createAppHandler() {
    const { ensureApp } = useAppEnsure()
    try {
      await ensureApp()
    } catch (error) {
      console.error('❌ Error creating app:', error)
    }
  }

  return {
    pin,
    isUnlocked,
    showPin,
    checkPin,
    checkEnv,
    createAppHandler,
    envCheckResult,
    isEnvValid
  }
}
