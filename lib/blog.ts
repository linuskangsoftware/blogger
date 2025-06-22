import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const postsDirectory = path.join(process.cwd(), "posts")

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  content: string
  readTime: number
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  readTime: number
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function markdownToHtml(markdown: string): string {
  return marked(markdown)
}


export async function getAllPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })

    const samplePost = `---
title: "Welcome to Your Blog"
date: "2024-01-20"
author: "Blog Owner"
excerpt: "This is a sample post showing all markdown features working!"
tags: ["welcome", "sample", "markdown"]
---

# Welcome to Your Blog!

This is a sample post to show you how the blog works with **all markdown features**.

## Code Blocks

Here's some JavaScript:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome, \${name}\`;
}

greet("World");
\`\`\`

And some Python:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Tables | ✅ | Working perfectly |
| Code Blocks | ✅ | Syntax highlighted |
| Blockquotes | ✅ | Styled nicely |
| Lists | ✅ | Ordered and unordered |

## Blockquotes

> This is a blockquote with **bold text** and *italic text*.
> It can span multiple lines and contain formatting.

## Lists

### Unordered List
* First item
* Second item
* Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Inline Code

You can use \`inline code\` like this, and also **bold text** and *italic text*.

## Links

Check out [Google](https://google.com) or [GitHub](https://github.com).

**Delete this file** and add your own posts in the \`posts/\` directory!
`

    fs.writeFileSync(path.join(postsDirectory, "welcome.md"), samplePost)
  }

  let fileNames: string[] = []

  try {
    fileNames = fs.readdirSync(postsDirectory)
  } catch (error) {
    console.error("Error reading posts directory:", error)
    return []
  }

  const allPostsData = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)

      try {
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const matterResult = matter(fileContents)

        return {
          slug,
          title: matterResult.data.title || fileName.replace(/\.md$/, ""),
          date: matterResult.data.date || new Date().toISOString().split("T")[0],
          author: matterResult.data.author || "Anonymous",
          excerpt: matterResult.data.excerpt || matterResult.content.substring(0, 150) + "...",
          tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
          readTime: calculateReadTime(matterResult.content),
        }
      } catch (error) {
        console.error(`Error reading file ${fileName}:`, error)
        return null
      }
    })
    .filter((post): post is BlogPostMeta => post !== null)

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      console.error(`Post file not found: ${fullPath}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    const contentHtml = markdownToHtml(matterResult.content)

    return {
      slug,
      title: matterResult.data.title || slug,
      date: matterResult.data.date || new Date().toISOString().split("T")[0],
      author: matterResult.data.author || "Anonymous",
      excerpt: matterResult.data.excerpt || matterResult.content.substring(0, 150) + "...",
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      content: contentHtml,
      readTime: calculateReadTime(matterResult.content),
    }
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error)
    return null
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = posts.flatMap((post) => post.tags)
  return Array.from(new Set(tags)).sort()
}

export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}