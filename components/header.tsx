import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { fetchBlogDetails } from "@/lib/utils"

export async function Header() {
  const blogData = await fetchBlogDetails()
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-semibold text-lg text-black dark:text-white">{blogData.name}</span>
          </Link>

          <nav className="flex items-center space-x-1">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-medium"
              >
                Home
              </Button>
            </Link>
            <Link href="/posts">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 font-medium"
              >
                Blog posts
              </Button>
            </Link>
            <div className="ml-2">
              <ModeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}