'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function BlogsTable({ blogs }) {
  const router = useRouter()
  const [busyId, setBusyId] = useState(null)

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setBusyId(id)
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
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

  if (!blogs.length) {
    return <p className="text-sm text-neutral-500">No blogs yet.</p>
  }

  return (
    <div className="overflow-x-auto border border-neutral-200 rounded-lg bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr className="text-left">
            <th className="px-4 py-2 font-medium">Title</th>
            <th className="px-4 py-2 font-medium">Slug</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Date</th>
            <th className="px-4 py-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b.id} className="border-b border-neutral-100 last:border-0">
              <td className="px-4 py-2">{b.title}</td>
              <td className="px-4 py-2 text-neutral-600 font-mono text-xs">{b.slug}</td>
              <td className="px-4 py-2">
                {b.published ? (
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-green-100 text-green-800">
                    Published
                  </span>
                ) : (
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-neutral-200 text-neutral-700">
                    Draft
                  </span>
                )}
              </td>
              <td className="px-4 py-2 text-neutral-600">
                {b.date ? new Date(b.date).toLocaleDateString() : '—'}
              </td>
              <td className="px-4 py-2 text-right space-x-3">
                <Link
                  href={`/admin/blogs/${b.id}`}
                  className="text-orange-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(b.id, b.title)}
                  disabled={busyId === b.id}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  {busyId === b.id ? 'Deleting…' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
