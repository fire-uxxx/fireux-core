// filepath: /Users/danielwatson/Developer/FireUX/packages/fireux-core/composables/firestore/objects/Blog/_useBlogPosts.ts
import { computed, Ref } from "vue";
import { useFirestoreManager } from "@fireux/core";
import { useBlogPostCreate } from "./useBlogPostCreate";
import { useBlogPostDelete } from "./useBlogPostDelete";
import { useBlogPostUpdate } from "./useBlogPostUpdate";
import { useBlogPostUtils } from "./useBlogPostUtils";
import type { BlogPost } from "@fireux/core";

export async function useBlogPosts() {
  const { firestoreFetchCollection, firestoreFetchDoc } = useFirestoreManager();

  const { collectionData: blogPostsCollection } =
    await firestoreFetchCollection("blogs");

  const sortedBlogPostsCollection = computed(() => {
    const posts = blogPostsCollection.value as BlogPost[] | undefined;
    return posts?.slice().sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  });

  async function fetchBlogPost(
    slug: string
  ): Promise<Ref<BlogPost | null | undefined>> {
    return (await firestoreFetchDoc("blogs", slug)) as Ref<
      BlogPost | null | undefined
    >;
  }

  return {
    blogPostsCollection: sortedBlogPostsCollection,
    fetchBlogPost,
    ...useBlogPostCreate(),
    ...useBlogPostDelete(),
    ...useBlogPostUpdate(),
    ...useBlogPostUtils(),
  };
}
