// This file creates a mocked runtimeConfig for use in shared packages
// It should be loaded before any other imports in the Nuxt app

let runtimeConfigMock = {
  public: {
    tenantId: "default-tenant",
    appName: "FireUX App",
    appShortName: "FireUX",
    appThemeColor: "#FACC15",
    appIcon: "fire",
    domain: "localhost",
  },
};

export function setupMockConfig(config) {
  runtimeConfigMock = {
    public: {
      ...runtimeConfigMock.public,
      ...config,
    },
  };
}

export function getMockConfig() {
  return runtimeConfigMock;
}

// Mock the #imports module's useRuntimeConfig
if (typeof global !== "undefined") {
  global.useRuntimeConfig = () => runtimeConfigMock;
}

// Polyfill for import.meta.client/server
if (typeof global !== "undefined") {
  global.import = global.import || {};
  global.import.meta = global.import.meta || {};
  global.import.meta.client = typeof window !== "undefined";
  global.import.meta.server = !global.import.meta.client;
}
