
export function useBlogMetrics() {
  const { blogPostsCollection } = useBlogPosts()

  return {
    totalPosts: computed(() => blogPostsCollection.value?.length ?? 0),
    articlePosts: computed(
      () =>
        blogPostsCollection.value?.filter(post => post.type === 'article')
          .length ?? 0
    ),
    productPosts: computed(
      () =>
        blogPostsCollection.value?.filter(post => post.type === 'product')
          .length ?? 0
    )
  }
}
