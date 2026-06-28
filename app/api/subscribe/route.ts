import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const FREE_ALERT_LIMIT = 3

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export async function POST(req: NextRequest) {
  const { email, product_name } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Invalid email' },
      { status: 400 }
    )
  }

  const supabase = getClient()

  // Count active alerts for this email
  const { count, error: countError } = await supabase
    .from('email_subscribers')
    .select('*', { count: 'exact', head: true })
    .eq('email', email)
    .eq('status', 'active')

  if (countError) {
    console.error('[subscribe] Count error:', countError.message)
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    )
  }

  // Check if unlimited_alerts feature flag is on (Pro users)
  const { data: flag } = await supabase
    .from('feature_flags')
    .select('enabled')
    .eq('feature', 'unlimited_alerts')
    .single()

  const unlimitedEnabled = flag?.enabled ?? false

  if (!unlimitedEnabled && (count ?? 0) >= FREE_ALERT_LIMIT) {
    return NextResponse.json(
      {
        success: false,
        limit_reached: true,
        current_count: count,
        limit: FREE_ALERT_LIMIT,
        error: `You've reached your ${FREE_ALERT_LIMIT} free alert limit.`
      },
      { status: 403 }
    )
  }

  // Check for duplicate — same email + same product
  const { data: existing } = await supabase
    .from('email_subscribers')
    .select('id')
    .eq('email', email)
    .eq('product_name', product_name)
    .single()

  if (existing) {
    return NextResponse.json({ success: true, already_subscribed: true })
  }

  const { error: insertError } = await supabase
    .from('email_subscribers')
    .insert({ email, product_name, status: 'active' })

  if (insertError) {
    console.error('[subscribe] Insert error:', insertError.message)
    return NextResponse.json(
      { success: false, error: insertError.message },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    alerts_used: (count ?? 0) + 1,
    alerts_remaining: FREE_ALERT_LIMIT - ((count ?? 0) + 1)
  })
}
