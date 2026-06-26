import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Server-only client using service role key to bypass RLS on email_subscribers.
// SUPABASE_SERVICE_KEY must be set in .env.local / Vercel env vars.
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_KEY!
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function POST(req: NextRequest) {
  const { email, product_name } = await req.json()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 })
  }
  const supabase = getServiceClient()
  const { error } = await supabase
    .from('email_subscribers')
    .upsert({ email, product_name }, { onConflict: 'email', ignoreDuplicates: true })
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
