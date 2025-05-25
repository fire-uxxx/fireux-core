export default defineEventHandler(() => {
  const isValidEnv = (val: unknown): boolean =>
    typeof val === 'string' && val.trim().length > 0

  const runtimeConfig = useRuntimeConfig()

  if (!runtimeConfig?.public) {
    return {
      isValid: false,
      requiredVars: {},
      missingVars: ['runtimeConfig.public is missing']
    }
  }

  const requiredVars = {
    firebaseApiKey: runtimeConfig.public.firebaseApiKey,
    firebaseAuthDomain: runtimeConfig.public.firebaseAuthDomain,
    firebaseProjectId: runtimeConfig.public.firebaseProjectId,
    firebaseStorageBucket: runtimeConfig.public.firebaseStorageBucket,
    firebaseAppId: runtimeConfig.public.firebaseAppId,
    stripePublishableKey: runtimeConfig.public.stripePublishableKey,
    stripeSecretKey: runtimeConfig.stripeSecretKey,
    tenantId: runtimeConfig.public.tenantId,
    domain: runtimeConfig.public.domain,
    appName: runtimeConfig.public.appName,
    appShortName: runtimeConfig.public.appShortName,
    appThemeColor: runtimeConfig.public.appThemeColor,
    appIcon: runtimeConfig.public.appIcon,
    appBackgroundColor: runtimeConfig.public.appBackgroundColor,
    pin: runtimeConfig.public.pin
  }

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !isValidEnv(value))
    .map(([key]) => key)

  return {
    isValid: missingVars.length === 0,
    requiredVars,
    missingVars
  }
})
