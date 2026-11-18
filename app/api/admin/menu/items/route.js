import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { itemSchema, pickItemFields } from '@/lib/validation/menu'

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

  const allowed = pickItemFields(body)
  const parsed = itemSchema.safeParse(allowed)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    const supabase = createAdminClient()
    const { data: row, error } = await supabase
      .from('menu_items')
      .insert(parsed.data)
      .select()
      .single()
    if (error) {
      console.error('[admin/menu/items POST]', error)
      return NextResponse.json({ error: 'Create failed.' }, { status: 500 })
    }
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true, item: row }, { status: 201 })
  } catch (err) {
    console.error('[admin/menu/items POST] unexpected', err)
    return NextResponse.json({ error: 'Create failed.' }, { status: 500 })
  }
}
