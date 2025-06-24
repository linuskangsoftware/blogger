import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const url = process.env.BLOG_URL || "http://localhost:3000"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchBlogDetails() {
  const api_token = process.env.API_TOKEN

  const res = await fetch(`${url}/api`, {
    cache: "no-store",
    headers: {
      "Authorization": `Bearer ${api_token}`
    },
  })
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}