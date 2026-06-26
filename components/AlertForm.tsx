'use client'
import { useState } from 'react'

export default function AlertForm({ productName }: { productName: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product_name: productName })
      })
      const data = await res.json()
      if (data.success) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mt-6">
      <p className="text-sm font-medium mb-2">Get alerted when this drops lower</p>
      {status === 'success' ? (
        <p className="text-green-600">You&apos;re on the list. We&apos;ll alert you the moment it drops.</p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="border rounded px-3 py-2 flex-1 text-sm"
          />
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded text-sm font-medium"
          >
            Alert Me
          </button>
        </div>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-1">Something went wrong — try again.</p>
      )}
      <p className="text-xs text-gray-400 mt-2">
        Links support Vigil via affiliate commission at no cost to you.
      </p>
    </div>
  )
}
