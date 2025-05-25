// ------------------------------------------------------------------
// Author & full BlogPost
// ------------------------------------------------------------------
export interface Author {
  display_name: string
  handle: string
  avatar: string
  id: string
}

export interface BlogPost extends Sluggable {
  title: string
  content: string
  metaDescription: string
  slug: string
  created_at: string
  updated_at: string
  author: Author
  keywords: string[]
  tags: string[]
  canonicalUrl: string
  featuredImage: string
  socialImage: string
  readingTime: string
  cta_link: string
  cta_text: string         // ← new
  type: 'article' | 'product'
  product_id?: string
  appId: string
}

// ------------------------------------------------------------------
// Entry type: exactly what the user fills in
// ------------------------------------------------------------------
export type BlogPostEntry = Omit<
  BlogPost,
  | 'created_at'
  | 'updated_at'
  | 'appId'
>
