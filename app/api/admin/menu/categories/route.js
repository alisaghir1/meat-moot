import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { categorySchema, pickCategoryFields } from '@/lib/validation/menu'

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

  const allowed = pickCategoryFields(body)
  const parsed = categorySchema.safeParse(allowed)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    const supabase = createAdminClient()
    const { data: row, error } = await supabase
      .from('menu_categories')
      .insert(parsed.data)
      .select()
      .single()
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A category with that slug already exists.' }, { status: 409 })
      }
      console.error('[admin/menu/categories POST]', error)
      return NextResponse.json({ error: 'Create failed.' }, { status: 500 })
    }
    return NextResponse.json({ ok: true, category: row }, { status: 201 })
  } catch (err) {
    console.error('[admin/menu/categories POST] unexpected', err)
    return NextResponse.json({ error: 'Create failed.' }, { status: 500 })
  }
}
