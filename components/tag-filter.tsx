"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TagFilterProps {
  selectedTag?: string
}

export function TagFilter({ selectedTag }: TagFilterProps) {
  if (!selectedTag) return null

  return (
    <div className="mb-16" id="topics">
      <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-400">Filtered by:</span>
        <Link href="/posts" passHref legacyBehavior>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center"
            aria-label="Clear tag filter"
          >
            {selectedTag}
            <X className="w-3 h-3 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
