'use client'

import { useState } from 'react'
import Image from 'next/image'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

/**
 * Image upload component. Sends the file to /api/admin/upload, which:
 *  - re-validates MIME + size server-side,
 *  - renames to a UUID (never trusts user-supplied filename),
 *  - uploads to Supabase Storage with the service-role key,
 *  - returns the public URL.
 *
 * Props: value (current URL), onChange(newUrl), folder (storage subfolder)
 */
export default function ImageUpload({ value, onChange, folder = 'uploads', label }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPG, PNG, WEBP, GIF allowed.')
      return
    }
    if (file.size > MAX_SIZE) {
      setError('Max 5 MB.')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Upload failed')
      }
      const { url } = await res.json()
      onChange?.(url)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-sm font-medium text-neutral-700">{label}</label>
      ) : null}

      {value ? (
        <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden border border-neutral-300 bg-neutral-100">
          <Image src={value} alt="" fill className="object-cover" sizes="384px" unoptimized />
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center px-3 py-1.5 rounded-md border border-neutral-300 bg-white text-sm text-neutral-700 cursor-pointer hover:bg-neutral-50">
          <input
            type="file"
            accept={ALLOWED_TYPES.join(',')}
            onChange={handleFile}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? 'Uploading…' : value ? 'Replace image' : 'Choose image'}
        </label>

        {value ? (
          <button
            type="button"
            onClick={() => onChange?.('')}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        ) : null}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
