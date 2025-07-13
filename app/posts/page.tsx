import { getAllPosts, getAllTags, searchPosts } from "@/lib/blog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import SearchBar from "@/components/search-bar"
import { TagFilter } from "@/components/tag-filter"
import PostsList from "@/components/posts-list"  // the client component above

export default async function PostsPage({ searchParams }: { searchParams: { tag?: string; query?: string } }) {
  const selectedTag = searchParams.tag
  const query = searchParams.query?.trim()

  const tags = await getAllTags()
  const posts = query ? await searchPosts(query) : await getAllPosts()
  const filteredPosts = selectedTag ? posts.filter((post) => post.tags.includes(selectedTag)) : posts

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-10 text-center">
          <SearchBar initialValue={query || ""} />
        </div>

        <TagFilter selectedTag={selectedTag} />

        {filteredPosts.length > 0 ? (
          <PostsList posts={filteredPosts} />
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-4 text-black dark:text-white">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {query
                ? `No results for "${query}"`
                : selectedTag
                ? `No posts found for "${selectedTag}"`
                : "No posts available yet"}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}