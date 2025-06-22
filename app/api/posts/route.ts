import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

export async function GET() {
  try {
    ensurePostsDirectory()
    const files = fs.readdirSync(postsDirectory)
    const posts = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(postsDirectory, file)
        const content = fs.readFileSync(filePath, "utf8")
        const { data, content: markdownContent } = matter(content)
        return {
          slug: file.replace(".md", ""),
          filename: file,
          title: data.title || file.replace(".md", ""),
          date: data.date || new Date().toISOString().split("T")[0],
          author: data.author || "Anonymous",
          excerpt: data.excerpt || "",
          tags: data.tags || [],
          content: markdownContent,
          lastModified: fs.statSync(filePath).mtime.toISOString(),
        }
      })
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error reading posts:", error)
    return NextResponse.json({ error: "Failed to read posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    ensurePostsDirectory()
    const { filename, title, date, author, excerpt, tags, content } = await request.json()
    if (!filename || !title) {
      return NextResponse.json({ error: "Filename and title are required" }, { status: 400 })
    }
    const slug = filename.replace(/\.md$/, "")
    const filePath = path.join(postsDirectory, `${slug}.md`)
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File already exists" }, { status: 409 })
    }
    const frontmatter = {
      title,
      date: date || new Date().toISOString().split("T")[0],
      author: author || "Anonymous",
      excerpt: excerpt || "",
      tags: tags || [],
    }
    const fullContent = matter.stringify(content || "", frontmatter)
    fs.writeFileSync(filePath, fullContent, "utf8")
    return NextResponse.json({ message: "Post created successfully", slug })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}