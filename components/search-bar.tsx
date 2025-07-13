"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function SearchBar({ initialValue = "" }: { initialValue?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const query = value.trim()

    const params = new URLSearchParams()
    if (query) params.set("query", query)
    const tag = searchParams.get("tag")
    if (tag) params.set("tag", tag)

    router.push(`/posts?${params.toString()}`)
  }

  return (
    <section className="py-16 text-center max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Search Blog Posts</h2>
      <p className="mb-8 text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
        Quickly find blog posts by keyword in title, excerpt, or tags.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex max-w-md mx-auto border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden"
        role="search"
        aria-label="Search blog posts"
      >
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search blog posts..."
          className="flex-grow px-4 py-3 text-black dark:text-white bg-white dark:bg-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-semibold hover:brightness-110 transition"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>
    </section>
  )
}
