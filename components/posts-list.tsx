"use client"

import { BlogPostMeta } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"

type GroupedPosts = {
  [year: string]: {
    [month: string]: BlogPostMeta[]
  }
}

function groupPostsByYearAndMonth(posts: BlogPostMeta[]): GroupedPosts {
  return posts.reduce((acc, post) => {
    const date = new Date(post.date)
    const year = date.getFullYear().toString()
    const month = date.toLocaleString("default", { month: "long" })

    if (!acc[year]) acc[year] = {}
    if (!acc[year][month]) acc[year][month] = []

    acc[year][month].push(post)
    return acc
  }, {} as GroupedPosts)
}

export default function PostsList({ posts }: { posts: BlogPostMeta[] }) {
  const groupedPosts = groupPostsByYearAndMonth(posts)

  return (
    <>
      {Object.entries(groupedPosts).map(([year, months]) => (
        <section key={year} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-black dark:text-white ">{year}</h2>
          {Object.entries(months).map(([month, posts]) => (
            <div key={month} className="mb-8">
              {/*<h4 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">{month}</h4>*/}
              <div className="space-y-8">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} featured={false} />
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </>
  )
}