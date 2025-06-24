---
outline: deep
title: Helper Functions | Blogger Docs
---

# Helper Functions <Badge type="tip" text="v2" />

This module provides functions to manage a static Markdown-based blog system. Posts live in the ``posts/`` directory and use frontmatter for metadata.

You can use the helper module for creating custom components for your blog.

## Types

### `BlogPostMeta`

```ts
interface BlogPostMeta {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  readTime: number
}
```

### `BlogPost`

```ts
interface BlogPost extends BlogPostMeta {
  content: string
}
```

## Functions

::: tip

To use the Helper Functions, import all functions like so:

```ts
import {
  getAllPosts,
  getPostBySlug,
  getAllTags,
  getPostsByTag,
  searchPosts,
  getPostsByYear,
  getPostSlugs,
  getPostYears,
  getRelatedPosts,
  getPostsByAuthor,
  deletePost,
  createPost
} from "@/lib/blog"
```
:::

### ``getAllPosts(): Promise<BlogPostMeta[]>``

Returns all post metadata, sorted by newest date first. If no posts/ folder exists, it creates one and inserts a default welcome.md.

```ts
const posts: BlogPostMeta[] = await getAllPosts()
```

### ``getPostBySlug(slug: string): Promise<BlogPost | null>``

Fetches a full post (including rendered HTML) using the slug.

```ts
const post: BlogPost | null = await getPostBySlug("welcome")
```

### ``getAllTags(): Promise<string[]>``

Returns a sorted array of all unique tags across posts.

```ts
const tags: string[] = await getAllTags()
```

### ``getPostsByTag(tag: string): Promise<BlogPostMeta[]>``

Returns posts that contain a given tag.

```ts
const markdownPosts: BlogPostMeta[] = await getPostsByTag("markdown")
```

### ``searchPosts(query: string): Promise<BlogPostMeta[]>``

Case-insensitive search across title, excerpt, and tags.

```ts
const results: BlogPostMeta[] = await searchPosts("welcome")
```

### ``getPostsByYear(year: string): Promise<BlogPostMeta[]>``

Returns posts where the date starts with the given year ("YYYY").

```ts
const posts2024: BlogPostMeta[] = await getPostsByYear("2024")
```

### ``getPostSlugs(): Promise<string[]>``

Returns all post slugs (filenames without .md).

```ts
const slugs: string[] = await getPostSlugs()
```

### ``getPostYears(): Promise<string[]>``

Returns all unique years extracted from post dates, sorted newest to oldest.

```ts
const years: string[] = await getPostYears()
```

### ``getRelatedPosts(slug: string, tagMatchCount = 1): Promise<BlogPostMeta[]>``

Returns posts that share at least tagMatchCount tags with the given slug.

```ts
const related: BlogPostMeta[] = await getRelatedPosts("welcome", 2)
```

### ``getPostsByAuthor(author: string): Promise<BlogPostMeta[]>``

Returns posts written by the specified author (case-insensitive).

```ts
const postsByLinus: BlogPostMeta[] = await getPostsByAuthor("Linus Kang")
```

### ``deletePost(slug: string): boolean``

Deletes a Markdown post file inside the ``/post`` directory.

```ts
const success: boolean = deletePost("old-post")
```

### ``createPost(meta: BlogPostMeta, markdownContent: string): boolean``

Creates a new .md post file with frontmatter and content.

```ts
const success: boolean = createPost(
  {
    slug: "my-new-post",
    title: "My New Post",
    date: "2025-06-24",
    author: "Linus Kang",
    excerpt: "This is a brand new post",
    tags: ["new", "update"],
    readTime: 2
  },
  "# My New Post\n\nThis is the content."
)
```