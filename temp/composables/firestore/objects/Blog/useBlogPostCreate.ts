import { useFirestoreManager } from "@fireux/core";
import type { BlogPost } from "@fireux/core";

export function useBlogPostCreate() {
  const { setDocumentWithId } = useFirestoreManager();

  const createBlogPost = async (
    postData: Partial<BlogPost>,
    slug: string
  ): Promise<string> => {
    // Use the slug as the document ID
    return setDocumentWithId("blogs", slug, postData);
  };

  return { createBlogPost };
}
