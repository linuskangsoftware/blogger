import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"



const url = process.env.BLOG_URL || "http://localhost:3000"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchBlogDetails() {
  const res = await fetch(`${url}/api`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}