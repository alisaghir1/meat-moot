import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { blogSchema, pickAllowed } from '@/lib/validation/blog'
import { sanitizeHtml } from '@/lib/sanitize'

async function requireSession() {
  const session = await getSession()
  if (!session) return null
  return session
}

export async function POST(request) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  // 1. Mass-assignment guard
  const allowed = pickAllowed(body)

  // 2. Zod validation
  const parsed = blogSchema.safeParse(allowed)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data

  // 3. Sanitize rich-text BEFORE storage
  data.content = sanitizeHtml(data.content || '')
  data.content_ar = sanitizeHtml(data.content_ar || '')
  data.content_ru = sanitizeHtml(data.content_ru || '')
  if (Array.isArray(data.sections)) {
    data.sections = data.sections.map((s) => ({
      ...s,
      content: sanitizeHtml(s.content || ''),
      content_ar: sanitizeHtml(s.content_ar || ''),
      content_ru: sanitizeHtml(s.content_ru || ''),
    }))
  }

  try {
    const supabase = createAdminClient()
    const { data: row, error } = await supabase
      .from('blogs')
      .insert(data)
      .select()
      .single()
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A blog with that slug already exists.' }, { status: 409 })
      }
      console.error('[admin/blogs POST]', error)
      return NextResponse.json({ error: 'Create failed.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true, blog: row }, { status: 201 })
  } catch (err) {
    console.error('[admin/blogs POST] unexpected', err)
    return NextResponse.json({ error: 'Create failed.' }, { status: 500 })
  }
}
