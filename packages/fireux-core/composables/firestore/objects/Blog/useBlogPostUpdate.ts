import { useFirestoreManager } from "@fireux/core";
import type { BlogPost } from "@fireux/core";

export function useBlogPostUpdate() {
  const { updateFirestoreDocument } = useFirestoreManager();

  async function updateBlogPost(
    postId: string,
    updates: Partial<BlogPost>
  ): Promise<boolean> {
    if (!postId) throw new Error("No BlogPost ID provided.");
    if (!updates || typeof updates !== "object")
      throw new Error("Invalid update payload. Must be an object.");

    try {
      await updateFirestoreDocument("blogs", postId, updates);
      console.log(
        `✅ BlogPost Updated Successfully: ${JSON.stringify(updates)}`
      );
      return true;
    } catch (error) {
      console.error("❌ Error Updating BlogPost:", error);
      throw error;
    }
  }

  return { updateBlogPost };
}
