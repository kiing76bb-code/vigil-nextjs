-- Feature flags table
CREATE TABLE IF NOT EXISTS feature_flags (
  feature text primary key,
  enabled boolean default false,
  description text,
  created_at timestamptz default now()
);

-- Insert default flags (all paused until Stripe is ready)
INSERT INTO feature_flags (feature, enabled, description) VALUES
  ('sms_alerts', false, 'SMS/text price alerts'),
  ('price_history', false, 'Price history chart on deal pages'),
  ('instant_alerts', false, 'Instant alert delivery'),
  ('unlimited_alerts', false, 'Unlimited email alerts — free tier = 3 max')
ON CONFLICT (feature) DO NOTHING;

-- Grant access
GRANT ALL ON TABLE public.feature_flags TO service_role;
GRANT SELECT ON TABLE public.feature_flags TO anon;
