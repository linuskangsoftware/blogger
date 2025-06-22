const fs = require("fs")
const path = require("path")

const postsDirectory = path.join(process.cwd(), "posts")

console.log("🔍 Debugging Posts Directory")
console.log("Posts directory path:", postsDirectory)

// Check if directory exists
if (!fs.existsSync(postsDirectory)) {
  console.log("❌ Posts directory does not exist!")
  console.log("Create it with: mkdir posts")
  process.exit(1)
}

// List all files
const files = fs.readdirSync(postsDirectory)
console.log("\n📁 Files in posts directory:")

if (files.length === 0) {
  console.log("❌ No files found in posts directory")
  console.log("Add some .md files to get started!")
} else {
  files.forEach((file) => {
    const filePath = path.join(postsDirectory, file)
    const stats = fs.statSync(filePath)
    const isMarkdown = file.endsWith(".md")

    console.log(`${isMarkdown ? "✅" : "❌"} ${file} (${stats.size} bytes)`)

    if (isMarkdown) {
      try {
        const content = fs.readFileSync(filePath, "utf8")
        const lines = content.split("\n")
        const hasFrontmatter = content.startsWith("---")

        console.log(`   📄 ${lines.length} lines, frontmatter: ${hasFrontmatter ? "✅" : "❌"}`)

        if (hasFrontmatter) {
          const frontmatterEnd = content.indexOf("---", 3)
          if (frontmatterEnd > -1) {
            const frontmatter = content.substring(3, frontmatterEnd)
            const hasTitle = frontmatter.includes("title:")
            const hasDate = frontmatter.includes("date:")
            const hasAuthor = frontmatter.includes("author:")

            console.log(
              `   📝 title: ${hasTitle ? "✅" : "❌"}, date: ${hasDate ? "✅" : "❌"}, author: ${hasAuthor ? "✅" : "❌"}`,
            )
          }
        }
      } catch (error) {
        console.log(`   ❌ Error reading file: ${error.message}`)
      }
    }
  })
}

console.log("\n🚀 To add a new post, create a file like this:")
console.log(`
posts/my-post.md
---
title: "My Blog Post"
date: "2024-01-20"
author: "Your Name"
excerpt: "A brief description"
tags: ["tag1", "tag2"]
---

# My Blog Post

Your content here...
`)
