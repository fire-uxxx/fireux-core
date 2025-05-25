// Centralized runtime config for @fireux/core
let fireuxConfig: Record<string, any> = {};

export function setupFireuxConfig(config: Record<string, any>) {
  fireuxConfig = config;
}

export function useFireuxConfig() {
  return fireuxConfig;
}
