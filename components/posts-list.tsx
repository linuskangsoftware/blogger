"use client"

import { BlogPostMeta } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"

type GroupedPosts = {
  [year: string]: {
    [month: string]: {
      monthIndex: number
      posts: BlogPostMeta[]
    }
  }
}

function groupPostsByYearAndMonth(posts: BlogPostMeta[]): GroupedPosts {
  return posts.reduce((acc, post) => {
    const date = new Date(post.date)
    const year = date.getFullYear().toString()
    const monthIndex = date.getMonth()
    const month = date.toLocaleString("default", { month: "long" })

    if (!acc[year]) acc[year] = {}
    if (!acc[year][month]) {
      acc[year][month] = {
        monthIndex,
        posts: []
      }
    }

    acc[year][month].posts.push(post)
    return acc
  }, {} as GroupedPosts)
}

export default function PostsList({ posts }: { posts: BlogPostMeta[] }) {
  const groupedPosts = groupPostsByYearAndMonth(posts)
  const sortedYears = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <>
      {sortedYears.map((year) => {
        const months = groupedPosts[year]
        const sortedMonths = Object.entries(months).sort(
          (a, b) => b[1].monthIndex - a[1].monthIndex
        )

        return (
          <section key={year} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">{year}</h2>
            {sortedMonths.map(([month, data]) => (
              <div key={month} className="mb-8">
                <div className="space-y-8">
                  {data.posts
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((post) => (
                      <BlogCard key={post.slug} post={post} featured={false} />
                    ))}
                </div>
              </div>
            ))}
          </section>
        )
      })}
    </>
  )
}