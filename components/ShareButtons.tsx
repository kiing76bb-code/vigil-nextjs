'use client'
import { useState } from 'react'

export default function ShareButtons({ shareUrl, shareText }: { shareUrl: string, shareText: string }) {
  const [copied, setCopied] = useState(false)

  const buttons = [
    {
      label: '💬 WhatsApp',
      color: '#25D366',
      href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      label: '💙 Messenger',
      color: '#0099FF',
      href: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(shareUrl)}`
    },
    {
      label: '📱 Text',
      color: '#34C759',
      href: `sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      label: '𝕏 Twitter',
      color: '#000000',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
  ]

  return (
    <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
      <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px', fontWeight: '600' }}>
        SHARE THIS DEAL
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {buttons.map(btn => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: btn.color,
              color: '#fff',
              padding: '7px 14px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.78rem',
              fontWeight: '700'
            }}
          >
            {btn.label}
          </a>
        ))}
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          style={{
            background: copied ? '#6366f1' : '#e0e7ff',
            color: copied ? '#fff' : '#6366f1',
            padding: '7px 14px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.78rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          {copied ? '✅ Copied!' : '🔗 Copy Link'}
        </button>
      </div>
    </div>
  )
}
