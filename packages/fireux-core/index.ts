// ===============================
// FireUX Core Package - Public API
// ===============================

// Core App Logic
export * from "./composables/app/_useApp";

// Core User Types
export * from "./composables/firestore/CoreUser/_useCoreUser";
export * from "./composables/firestore/AppUser/_useAppUser";

// Firebase Integrations
export * from "./composables/firebase/useAuth";
export * from "./composables/firebase/useFirebaseStorage";
export * from "./composables/firebase/useMediaStorage";

// Firestore Utilities
export * from "./composables/firestore/_useFirestoreManager";

// Domain: Blog
export * from "./composables/firestore/objects/Blog/_useBlogPosts";

// Domain: Product
export * from "./composables/firestore/objects/Product/_useProducts";

// Shared Utilities
export * from "./composables/utils/useBreadcrumbs";
export * from "./composables/utils/useEditHandler";
export * from "./composables/utils/useRoutes";

// Models
export * from "./models/app.model";
export * from "./models/blogPost.model";
export * from "./models/product.model";
export * from "./models/protocols";
export * from "./models/user.model";

// Shared Configuration
export { setupFireuxConfig, useFireuxConfig } from "./composables/useFireuxConfig";
export { fireuxDefaults } from "./nuxt-config/shared";