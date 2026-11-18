import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { itemSchema, pickItemFields } from '@/lib/validation/menu'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function PUT(request, { params }) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  if (!UUID_RE.test(id)) return NextResponse.json({ error: 'Invalid id.' }, { status: 400 })

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
      .update(parsed.data)
      .eq('id', id)
      .select()
      .single()
    if (error) {
      console.error('[admin/menu/items PUT]', error)
      return NextResponse.json({ error: 'Update failed.' }, { status: 500 })
    }
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true, item: row })
  } catch (err) {
    console.error('[admin/menu/items PUT] unexpected', err)
    return NextResponse.json({ error: 'Update failed.' }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  if (!UUID_RE.test(id)) return NextResponse.json({ error: 'Invalid id.' }, { status: 400 })

  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (error) {
      console.error('[admin/menu/items DELETE]', error)
      return NextResponse.json({ error: 'Delete failed.' }, { status: 500 })
    }
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/menu/items DELETE] unexpected', err)
    return NextResponse.json({ error: 'Delete failed.' }, { status: 500 })
  }
}
