import NewsForm from '../_components/NewsForm'

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">New News Item</h1>
        <p className="text-sm text-neutral-600">Create a news item with English + Arabic content.</p>
      </header>
      <NewsForm mode="create" />
    </div>
  )
}
