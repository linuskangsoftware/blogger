"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TagFilterProps {
  tags: string[]
  selectedTag?: string
}

export function TagFilter({ tags, selectedTag }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div className="mb-16" id="topics">
      {selectedTag ? (
        <div className="flex items-center gap-4 mb-8">
          <span className="text-gray-600 dark:text-gray-400">Filtered by:</span>
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              {selectedTag}
              <X className="w-3 h-3 ml-2" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}>
                <Badge
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors font-medium px-3 py-1"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
