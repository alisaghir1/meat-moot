import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { blogSchema, pickAllowed } from '@/lib/validation/blog'
import { sanitizeHtml } from '@/lib/sanitize'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function requireSession() {
  return (await getSession()) || null
}

export async function PUT(request, { params }) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const allowed = pickAllowed(body)
  const parsed = blogSchema.safeParse(allowed)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data
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
      .update(data)
      .eq('id', id)
      .select()
      .single()
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A blog with that slug already exists.' }, { status: 409 })
      }
      console.error('[admin/blogs PUT]', error)
      return NextResponse.json({ error: 'Update failed.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true, blog: row })
  } catch (err) {
    console.error('[admin/blogs PUT] unexpected', err)
    return NextResponse.json({ error: 'Update failed.' }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 })
  }

  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) {
      console.error('[admin/blogs DELETE]', error)
      return NextResponse.json({ error: 'Delete failed.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/blogs DELETE] unexpected', err)
    return NextResponse.json({ error: 'Delete failed.' }, { status: 500 })
  }
}
