// ~/composables/firestore/objects/Product/useProductCreate.ts

import { useCurrentUser } from "vuefire";
import { useMediaStorage, useProducts } from "@fireux/core";

export function useProductCreate() {
  const { useRuntimeConfig } = require("#imports");
  const {
    public: { tenantId },
  } = useRuntimeConfig();

  // Get state composables from useProducts (exposed via core)
  let useCreateProductState: any, useCreatePricesState: any;
  (async () => {
    const products = await useProducts();
    useCreateProductState = products.useCreateProductState;
    useCreatePricesState = products.useCreatePricesState;
  })();

  // Wait for composables to be available
  function waitForStateComposables() {
    return new Promise<void>((resolve) => {
      const check = () => {
        if (useCreateProductState && useCreatePricesState) return resolve();
        setTimeout(check, 10);
      };
      check();
    });
  }

  type StripeCreateResponse =
    | { success: true; id: string; message: string }
    | { success: false; error: string };

  const now = new Date().toISOString();

  async function createProduct() {
    await waitForStateComposables();
    const {
        product,
        mainImageData,
        resetCreateProductState,
        getProductPayload,
      } = useCreateProductState(),
      { pricesPayload, resetCreatePricesState } = useCreatePricesState(),
      { uploadImage } = useMediaStorage();

    const currentUser = useCurrentUser();
    while (!currentUser.value) await new Promise((r) => setTimeout(r, 50));

    // Get updateProduct from useProducts in the standard pattern
    const { updateProduct } = await useProducts();

    try {
      // Upload and assign image
      const imageUrl = await uploadImage(
        mainImageData.value,
        "products",
        product.value.id || "",
        "main"
      );

      product.value.main_image = imageUrl;

      const productPayload = await getProductPayload();
      const stripePayload = {
        ...productPayload,
        images: [imageUrl],
        prices: pricesPayload.value,
      };

      const response: StripeCreateResponse = await $fetch(
        "/api/stripe/create-product",
        {
          method: "POST",
          body: { product: stripePayload },
        }
      );

      if (!response.success || !response.id) {
        console.error("❌ Stripe product creation failed:", response);
        return { success: false, error: "Stripe product creation failed" };
      }

      // Set the Stripe price id as the default_price id
      const default_price = {
        id: response.id,
        unit_amount: pricesPayload.value[0]?.unit_amount ?? 0,
        interval: pricesPayload.value[0]?.interval,
      };

      await updateProduct(response.id, {
        main_image: product.value.main_image,
        tenant_id: tenantId as string,
        creator_id: currentUser.value?.uid || "",
        slug: product.value.slug,
        content: product.value.content,
        product_type: product.value.product_type,
        stock: product.value.stock,
        track_stock: product.value.track_stock,
        created_at: now,
        updated_at: now,
        default_price,
      });

      resetCreateProductState();
      resetCreatePricesState();

      return { success: true, id: response.id };
    } catch (error) {
      console.error("❌ Product creation error:", error);
      return { success: false, error: "Unexpected error occurred." };
    }
  }

  return {
    createProduct,
  };
}
