import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { newsSchema, pickAllowed } from '@/lib/validation/news'
import { sanitizeHtml } from '@/lib/sanitize'

export async function POST(request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const allowed = pickAllowed(body)
  const parsed = newsSchema.safeParse(allowed)
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
      .from('news')
      .insert(data)
      .select()
      .single()
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A news item with that slug already exists.' }, { status: 409 })
      }
      console.error('[admin/news POST]', error)
      return NextResponse.json({ error: 'Create failed.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true, news: row }, { status: 201 })
  } catch (err) {
    console.error('[admin/news POST] unexpected', err)
    return NextResponse.json({ error: 'Create failed.' }, { status: 500 })
  }
}
