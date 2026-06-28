import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const supabase = getClient()

  await supabase
    .from('email_subscribers')
    .upsert(
      { email, product_name: 'PRO_WAITLIST', status: 'waitlist' },
      { onConflict: 'email', ignoreDuplicates: true }
    )

  return NextResponse.json({ success: true })
}
