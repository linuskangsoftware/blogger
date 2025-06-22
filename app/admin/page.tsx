"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Save, X, Eye, Calendar, User } from "lucide-react"
import Link from "next/link"

interface Post {
  slug: string
  filename: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  content: string
  lastModified: string
}

interface FormData {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string
  content: string
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  // Use refs to prevent focus loss
  const formRef = useRef<FormData>({
    slug: "",
    title: "",
    date: "",
    author: "",
    excerpt: "",
    tags: "",
    content: "",
  })

  const [, forceUpdate] = useState({})
  const triggerUpdate = useCallback(() => forceUpdate({}), [])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = useCallback(() => {
    formRef.current = {
      slug: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      author: "",
      excerpt: "",
      tags: "",
      content: "",
    }
    triggerUpdate()
  }, [triggerUpdate])

  const updateFormField = useCallback(
    (field: keyof FormData, value: string) => {
      formRef.current[field] = value
      triggerUpdate()
    },
    [triggerUpdate],
  )

  const handleCreate = useCallback(() => {
    resetForm()
    setIsCreateDialogOpen(true)
  }, [resetForm])

  const handleEdit = useCallback(
    (post: Post) => {
      setEditingPost(post)
      formRef.current = {
        slug: post.slug,
        title: post.title,
        date: post.date,
        author: post.author,
        excerpt: post.excerpt,
        tags: post.tags.join(", "),
        content: post.content,
      }
      triggerUpdate()
      setIsEditDialogOpen(true)
    },
    [triggerUpdate],
  )

  const handleSave = async (isEdit = false) => {
    if (saving) return
    setSaving(true)

    try {
      const tagsArray = formRef.current.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      const postData = {
        filename: `${formRef.current.slug}.md`,
        title: formRef.current.title,
        date: formRef.current.date,
        author: formRef.current.author,
        excerpt: formRef.current.excerpt,
        tags: tagsArray,
        content: formRef.current.content,
        ...(isEdit && { newSlug: formRef.current.slug }),
      }

      const url = isEdit ? `/api/posts/${editingPost?.slug}` : "/api/posts"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        await fetchPosts()
        setIsCreateDialogOpen(false)
        setIsEditDialogOpen(false)
        setEditingPost(null)
        resetForm()
      } else {
        const error = await response.json()
        alert(error.error || "Failed to save post")
      }
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Failed to save post")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/posts/${slug}`, { method: "DELETE" })
      if (response.ok) {
        await fetchPosts()
      } else {
        alert("Failed to delete post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post")
    }
  }

  const handleCloseDialog = useCallback(() => {
    setIsCreateDialogOpen(false)
    setIsEditDialogOpen(false)
    resetForm()
  }, [resetForm])

  // Memoized form component to prevent unnecessary re-renders
  const PostForm = useCallback(
    ({ isEdit = false }: { isEdit?: boolean }) => (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Slug (filename)</label>
            <Input
              placeholder="my-blog-post"
              value={formRef.current.slug}
              onChange={(e) => updateFormField("slug", e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <Input
              type="date"
              value={formRef.current.date}
              onChange={(e) => updateFormField("date", e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Title</label>
          <Input
            placeholder="My Awesome Blog Post"
            value={formRef.current.title}
            onChange={(e) => updateFormField("title", e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Author</label>
            <Input
              placeholder="Your Name"
              value={formRef.current.author}
              onChange={(e) => updateFormField("author", e.target.value)}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
            <Input
              placeholder="react, nextjs, tutorial"
              value={formRef.current.tags}
              onChange={(e) => updateFormField("tags", e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Excerpt</label>
          <Textarea
            placeholder="Brief description of your post..."
            value={formRef.current.excerpt}
            onChange={(e) => updateFormField("excerpt", e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Content (Markdown)</label>
          <Textarea
            placeholder="# Your blog post content here..."
            value={formRef.current.content}
            onChange={(e) => updateFormField("content", e.target.value)}
            rows={15}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCloseDialog} disabled={saving}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={() => handleSave(isEdit)} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : isEdit ? "Update" : "Create"} Post
          </Button>
        </div>
      </div>
    ),
    [updateFormField, handleCloseDialog, saving],
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Administrator Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your blog's settings</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts">Manage Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="logs">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {posts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first blog post to get started</p>
                  <Button onClick={handleCreate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {posts.map((post) => (
                  <Card key={post.slug} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>Modified: {new Date(post.lastModified).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">{post.excerpt}</p>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(post.slug)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Audit Log</h3>
                <p className="text-gray-600 dark:text-gray-400">Coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Post Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <PostForm />
          </DialogContent>
        </Dialog>

        {/* Edit Post Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
            </DialogHeader>
            <PostForm isEdit />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
