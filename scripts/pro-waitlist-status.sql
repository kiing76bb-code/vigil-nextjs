-- Add waitlist status support
-- Run this if email_subscribers.status has a constraint
ALTER TABLE email_subscribers
  DROP CONSTRAINT IF EXISTS email_subscribers_status_check;
