import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import type { BlogPostMeta } from "@/lib/blog"

interface BlogCardProps {
  post: BlogPostMeta
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <article className="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200">
        <div className="p-8 lg:p-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">{post.author}</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </span>
              <span>{post.readTime} min read</span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>

          <Link href={`/blog/${post.slug}`} className="block">
            <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {post.title}
            </h2>
          </Link>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
                  <Badge
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors font-medium"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="group border-b border-gray-200 dark:border-gray-800 pb-12 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          <span>{post.readTime} min</span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </div>

      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="text-2xl font-semibold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors leading-tight">
          {post.title}
        </h3>
      </Link>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{post.excerpt}</p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
              <Badge
                variant="secondary"
                className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-xs font-medium"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
