'use client'
import { useState } from 'react'

type Status = 'idle' | 'success' | 'error' | 'limit_reached' | 'already_subscribed'

export default function AlertForm({ productName }: { productName: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [alertsRemaining, setAlertsRemaining] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistDone, setWaitlistDone] = useState(false)

  async function handleSubmit() {
    if (!email) return
    setLoading(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product_name: productName })
      })

      const data = await res.json()

      if (data.limit_reached) {
        setWaitlistEmail(email)
        setStatus('limit_reached')
      } else if (data.already_subscribed) {
        setStatus('already_subscribed')
      } else if (data.success) {
        setStatus('success')
        if (data.alerts_remaining !== undefined) {
          setAlertsRemaining(data.alerts_remaining)
        }
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  async function handleWaitlist() {
    if (!waitlistEmail) return
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail })
      })
    } catch {
      // silent — best effort
    }
    setWaitlistDone(true)
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <p style={{
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#666',
        marginBottom: '10px'
      }}>
        Get alerted when this drops lower
      </p>

      {/* Success */}
      {status === 'success' && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '10px',
          padding: '14px 16px'
        }}>
          <p style={{ color: '#16a34a', fontWeight: '600', fontSize: '0.9rem', margin: 0 }}>
            ✅ You&apos;re on the list. We&apos;ll alert you the moment it drops.
          </p>
          {alertsRemaining !== null && alertsRemaining > 0 && (
            <p style={{ color: '#888', fontSize: '0.78rem', margin: '6px 0 0' }}>
              You have {alertsRemaining} free alert{alertsRemaining !== 1 ? 's' : ''} remaining.
            </p>
          )}
          {alertsRemaining === 0 && (
            <p style={{ color: '#888', fontSize: '0.78rem', margin: '6px 0 0' }}>
              You&apos;ve used all 3 free alerts. Vigil Pro coming soon for unlimited alerts.
            </p>
          )}
        </div>
      )}

      {/* Already subscribed */}
      {status === 'already_subscribed' && (
        <div style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '10px',
          padding: '14px 16px'
        }}>
          <p style={{ color: '#0369a1', fontWeight: '600', fontSize: '0.9rem', margin: 0 }}>
            👀 You&apos;re already watching this one. We&apos;ll alert you when it drops.
          </p>
        </div>
      )}

      {/* Limit reached */}
      {status === 'limit_reached' && (
        <div style={{
          background: '#0d1117',
          border: '1px solid #00e87a',
          borderRadius: '10px',
          padding: '20px 16px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '1.1rem',
            fontWeight: '800',
            color: '#ffffff',
            margin: '0 0 8px'
          }}>
            🔒 You&apos;ve used your 3 free alerts
          </p>
          <p style={{
            fontSize: '0.85rem',
            color: '#888',
            margin: '0 0 16px',
            lineHeight: 1.5
          }}>
            Vigil Pro is coming soon with unlimited alerts,
            SMS notifications, and instant price drop delivery.
          </p>
          {waitlistDone ? (
            <p style={{ color: '#00e87a', fontWeight: '700', fontSize: '0.9rem' }}>
              ✅ You&apos;re on the waitlist — we&apos;ll let you know first.
            </p>
          ) : (
            <>
              <button
                onClick={handleWaitlist}
                style={{
                  background: '#00e87a',
                  color: '#000',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}
              >
                Join the Pro Waitlist →
              </button>
              <p style={{
                fontSize: '0.72rem',
                color: '#555',
                margin: '10px 0 0'
              }}>
                Early access members get 50% off at launch.
              </p>
            </>
          )}
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>
          Something went wrong — try again.
        </p>
      )}

      {/* Form — hide after terminal states */}
      {(status === 'idle' || status === 'error') && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="your@email.com"
            style={{
              flex: 1,
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: loading ? '#888' : '#0d1117',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {loading ? '...' : 'Alert Me'}
          </button>
        </div>
      )}

      <p style={{
        color: '#bbb',
        fontSize: '0.72rem',
        marginTop: '8px'
      }}>
        Links support Vigil via affiliate commission at no cost to you.
      </p>
    </div>
  )
}
