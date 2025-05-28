export function useProductMetrics() {
  const { productsCollection } = useProducts()

  return {
    totalProducts: computed(() => productsCollection.value?.length ?? 0),
    activeProducts: computed(
      () =>
        productsCollection.value?.filter(product => product.active).length ?? 0
    ),
    outOfStockProducts: computed(
      () =>
        productsCollection.value?.filter(product => product.stock === 0)
          .length ?? 0
    ),
    physicalProducts: computed(
      () =>
        productsCollection.value?.filter(
          product => product.productType === 'physical'
        ).length ?? 0
    ),
    digitalProducts: computed(
      () =>
        productsCollection.value?.filter(
          product => product.productType === 'digital'
        ).length ?? 0
    ),
    serviceProducts: computed(
      () =>
        productsCollection.value?.filter(
          product => product.productType === 'service'
        ).length ?? 0
    )
  }
}
