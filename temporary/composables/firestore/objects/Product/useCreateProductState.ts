// ~/composables/admin/useCreateProductState.ts
import { useStorage } from "@vueuse/core";
import { useCurrentUser } from "vuefire";
import { useFirestoreManager } from "@fireux/core";
import type { FirebaseProduct } from "@fireux/core";
import { ref, watch, onMounted } from "vue";

export function useCreateProductState() {
  const now = new Date().toISOString();

  const currentUser = useCurrentUser();
  const { useRuntimeConfig } = require("#imports");
  const {
    public: { tenantId },
  } = useRuntimeConfig();

  const defaultProduct: Partial<FirebaseProduct> = {
    id: "",
    name: "",
    description: "",
    content: "",
    active: true,
    prices: [],
    created_at: now,
    updated_at: now,
    slug: "",
    creator_id: currentUser.value?.uid || "",
    tenant_id: tenantId as string,
    stock: null,
    track_stock: false,
    product_type: "physical",
    default_price: undefined,
  };

  const product = useStorage<Partial<FirebaseProduct>>(
    "createProduct",
    defaultProduct
  );

  const mainImageData = useStorage<string>("createProductMainImage", "");

  // Get useProductUtils from useProducts (exposed via core)
  let buildSlugIfUnique: any;
  (async () => {
    const products = await (await import("@fireux/core")).useProducts();
    buildSlugIfUnique = products.buildSlugIfUnique;
  })();

  // Get useCreatePricesState from useProducts (exposed via core)
  let useCreatePricesState: any;
  (async () => {
    const products = await (await import("@fireux/core")).useProducts();
    useCreatePricesState = products.useCreatePricesState;
  })();

  const { defaultPrice } = useCreatePricesState();
  const { checkUnique } = useFirestoreManager();

  const isSlugTaken = ref(false);

  // Auto-generate slug
  watch(
    () => product.value.name,
    async (newName) => {
      if (!newName) {
        isSlugTaken.value = false;
        product.value.slug = "";
        return;
      }
      // Always set the slug to tenantId + kebab-case product name
      const base = newName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const slug = `${tenantId}-${base}`;
      product.value.slug = slug;

      // Check if this slug is already taken
      isSlugTaken.value = await checkUnique("products", "slug", slug, true);
    }
  );

  // Populate creator_id and tenant_id on mount
  onMounted(() => {
    if (currentUser.value?.uid)
      product.value.creator_id = currentUser.value.uid;
    if (tenantId) product.value.tenant_id = tenantId as string;
  });

  function resetCreateProductState() {
    product.value = {
      id: "",
      name: "",
      description: "",
      content: "",
      active: true,
      prices: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      slug: "",
      creator_id: currentUser.value?.uid || "",
      tenant_id: tenantId as string,
      stock: null,
      track_stock: false,
      product_type: "physical",
      default_price: defaultPrice.value ?? undefined,
    };
    mainImageData.value = "";
  }

  async function getProductPayload() {
    const name = product.value.name?.trim();
    if (!name) throw new Error("❌ Product name is required.");
    if (!mainImageData.value) throw new Error("❌ Main image is required.");
    if (!product.value.slug) throw new Error("❌ Slug is required.");

    const slugResult = await buildSlugIfUnique(
      "products",
      name,
      tenantId as string
    );
    if (!slugResult.success) throw new Error(`❌ ${slugResult.message}`);

    return {
      name,
      description: product.value.description || "",
      content: product.value.content || "",
      active: product.value.active ?? true,
      slug: product.value.slug || "",
      stock: product.value.stock ?? null,
      product_type: product.value.product_type ?? "physical",
      track_stock: product.value.track_stock ?? false,
      images: [mainImageData.value],
      default_price: defaultPrice.value ?? undefined,
    };
  }

  return {
    product,
    mainImageData,
    resetCreateProductState,
    getProductPayload,
    defaultPrice,
    isSlugTaken,
    buildSlugIfUnique,
  };
}
