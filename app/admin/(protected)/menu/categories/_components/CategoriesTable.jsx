'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CategoriesTable({ categories }) {
  const router = useRouter()
  const [busyId, setBusyId] = useState(null)

  async function handleDelete(id, name) {
    if (!confirm(`Delete category "${name}"? Items in this category will also be removed. This cannot be undone.`)) return
    setBusyId(id)
    try {
      const res = await fetch(`/api/admin/menu/categories/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        alert(body.error || 'Delete failed.')
        return
      }
      router.refresh()
    } finally {
      setBusyId(null)
    }
  }

  if (!categories.length) {
    return <p className="text-sm text-neutral-500">No categories yet.</p>
  }

  return (
    <div className="overflow-x-auto border border-neutral-200 rounded-lg bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr className="text-left">
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Slug</th>
            <th className="px-4 py-2 font-medium">Order</th>
            <th className="px-4 py-2 font-medium">Active</th>
            <th className="px-4 py-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-b border-neutral-100 last:border-0">
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2 text-neutral-600 font-mono text-xs">{c.slug}</td>
              <td className="px-4 py-2">{c.display_order}</td>
              <td className="px-4 py-2">
                {c.active ? (
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-green-100 text-green-800">Yes</span>
                ) : (
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-neutral-200 text-neutral-700">No</span>
                )}
              </td>
              <td className="px-4 py-2 text-right space-x-3">
                <Link href={`/admin/menu/categories/${c.id}`} className="text-orange-600 hover:underline">Edit</Link>
                <button
                  type="button"
                  onClick={() => handleDelete(c.id, c.name)}
                  disabled={busyId === c.id}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  {busyId === c.id ? 'Deleting…' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
