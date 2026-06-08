'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ItemsTable({ items }) {
  const router = useRouter()
  const [busyId, setBusyId] = useState(null)

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setBusyId(id)
    try {
      const res = await fetch(`/api/admin/menu/items/${id}`, { method: 'DELETE' })
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

  if (!items.length) {
    return <p className="text-sm text-neutral-500">No menu items yet.</p>
  }

  return (
    <div className="overflow-x-auto border border-neutral-200 rounded-lg bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr className="text-left">
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Category</th>
            <th className="px-4 py-2 font-medium">Price</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-b border-neutral-100 last:border-0">
              <td className="px-4 py-2">
                {it.name}
                {it.featured ? (
                  <span className="ml-2 inline-block px-2 py-0.5 text-[10px] uppercase rounded bg-orange-100 text-orange-700">
                    Featured
                  </span>
                ) : null}
              </td>
              <td className="px-4 py-2 text-neutral-600">
                {it.menu_categories?.name || '—'}
              </td>
              <td className="px-4 py-2">
                {it.price != null ? `${it.currency || 'AED'} ${Number(it.price).toFixed(2)}` : '—'}
              </td>
              <td className="px-4 py-2">
                {it.available ? (
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-green-100 text-green-800">Available</span>
                ) : (
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-neutral-200 text-neutral-700">Hidden</span>
                )}
              </td>
              <td className="px-4 py-2 text-right space-x-3">
                <Link href={`/admin/menu/items/${it.id}`} className="text-orange-600 hover:underline">Edit</Link>
                <button
                  type="button"
                  onClick={() => handleDelete(it.id, it.name)}
                  disabled={busyId === it.id}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  {busyId === it.id ? 'Deleting…' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
