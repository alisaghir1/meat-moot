import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSession } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const EXT_BY_MIME = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'meatmoot-media'

/**
 * Admin-only image upload.
 * - Re-validates MIME + size server-side (never trust the client).
 * - Renames to UUID + canonical extension (never uses user filename).
 * - Uploads via service-role client to a public bucket; returns public URL.
 */
export async function POST(request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let formData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
  }

  const file = formData.get('file')
  const folderRaw = String(formData.get('folder') || 'uploads')
  // Sanitize folder: only alphanum, dash, underscore, slash
  const folder = folderRaw.replace(/[^a-z0-9_\-/]/gi, '').replace(/^\/+|\/+$/g, '') || 'uploads'

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type.' }, { status: 415 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 5 MB).' }, { status: 413 })
  }

  const ext = EXT_BY_MIME[file.type]
  const objectName = `${folder}/${crypto.randomUUID()}.${ext}`

  try {
    const supabase = createAdminClient()
    const bytes = Buffer.from(await file.arrayBuffer())

    const { error } = await supabase.storage.from(BUCKET).upload(objectName, bytes, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })
    if (error) {
      console.error('[admin/upload] storage error:', error)
      return NextResponse.json({ error: 'Upload failed.' }, { status: 500 })
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectName)
    return NextResponse.json({ url: data.publicUrl, path: objectName })
  } catch (err) {
    console.error('[admin/upload] unexpected error:', err)
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 })
  }
}

export const config = {
  api: { bodyParser: false },
}
