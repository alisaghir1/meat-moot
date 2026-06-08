import CategoryForm from '../_components/CategoryForm'

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">New Category</h1>
        <p className="text-sm text-neutral-600">Create a new menu category.</p>
      </header>
      <CategoryForm mode="create" />
    </div>
  )
}
