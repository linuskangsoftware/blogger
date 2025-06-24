import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {

  try {

    const authHeader = request.headers.get("Authorization")
    const token = authHeader?.split(" ")[1]

    if (token !== process.env.API_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const filePath = path.join(postsDirectory, `${params.slug}.md`)
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    const content = fs.readFileSync(filePath, "utf8")
    const { data, content: markdownContent } = matter(content)
    return NextResponse.json({
      slug: params.slug,
      filename: `${params.slug}.md`,
      title: data.title || params.slug,
      date: data.date || new Date().toISOString().split("T")[0],
      author: data.author || "Anonymous",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      content: markdownContent,
      lastModified: fs.statSync(filePath).mtime.toISOString(),
    })
  } catch (error) {
    console.error("Error reading post:", error)
    return NextResponse.json({ error: "Failed to read post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {

    const authHeader = request.headers.get("Authorization")
    const token = authHeader?.split(" ")[1]

    if (token !== process.env.API_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, date, author, excerpt, tags, content, newSlug } = await request.json()
    const oldFilePath = path.join(postsDirectory, `${params.slug}.md`)
    if (!fs.existsSync(oldFilePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    const frontmatter = {
      title: title || params.slug,
      date: date || new Date().toISOString().split("T")[0],
      author: author || "Anonymous",
      excerpt: excerpt || "",
      tags: tags || [],
    }
    const fullContent = matter.stringify(content || "", frontmatter)
    if (newSlug && newSlug !== params.slug) {
      const newFilePath = path.join(postsDirectory, `${newSlug}.md`)
      if (fs.existsSync(newFilePath)) {
        return NextResponse.json({ error: "A post with that slug already exists" }, { status: 409 })
      }
      fs.writeFileSync(newFilePath, fullContent, "utf8")
      fs.unlinkSync(oldFilePath)
      return NextResponse.json({ message: "Post updated successfully", slug: newSlug })
    } else {
      fs.writeFileSync(oldFilePath, fullContent, "utf8")
      return NextResponse.json({ message: "Post updated successfully", slug: params.slug })
    }
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {

    const authHeader = request.headers.get("Authorization")
    const token = authHeader?.split(" ")[1]

    if (token !== process.env.API_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const filePath = path.join(postsDirectory, `${params.slug}.md`)
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    fs.unlinkSync(filePath)
    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}