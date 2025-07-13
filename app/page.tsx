import { getAllPosts, getAllTags } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { fetchBlogDetails } from "@/lib/utils"

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string }
}) {
  const posts = await getAllPosts()
  const tags = await getAllTags()
  const selectedTag = searchParams.tag

  const blogData = await fetchBlogDetails()

  const filteredPosts = selectedTag ? posts.filter((post) => post.tags.includes(selectedTag)) : posts

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold text-black dark:text-white mb-6 tracking-tight leading-none">{blogData.name}</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {blogData.description}
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16 max-w-6xl">

        <h1 className="text-4xl font-semibold text-black dark:text-white mb-8">Latest Posts</h1>
        <div className="space-y-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => <BlogCard key={post.slug} post={post} featured={index === 0} />)
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">No posts found</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {selectedTag ? `No posts found for "${selectedTag}"` : "No posts available yet"}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}