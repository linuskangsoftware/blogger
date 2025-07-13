import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="mb-8 -ml-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <article>
          {/* Header */}
          <header className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span className="font-medium">{post.author}</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>{post.readTime} min read</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/posts?tag=${encodeURIComponent(tag)}`}>
                    <Badge
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
      <Footer />
    </div>
  )
}
