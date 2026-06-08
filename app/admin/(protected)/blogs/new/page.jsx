import BlogForm from '../_components/BlogForm'

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">New Blog</h1>
        <p className="text-sm text-neutral-600">Create a new blog post with English + Arabic content.</p>
      </header>
      <BlogForm mode="create" />
    </div>
  )
}
