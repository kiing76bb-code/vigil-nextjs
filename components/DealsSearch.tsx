'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/deals'

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function DealsSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase().trim()))
    : products

  return (
    <>
      {/* Search bar */}
      <div style={{
        maxWidth: '480px',
        margin: '0 auto 40px',
        padding: '0 20px',
        position: 'relative'
      }}>
        <input
          type="text"
          placeholder="Search deals..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%',
            background: '#1a1a1a',
            border: query ? '1px solid #22c55e' : '1px solid #2a2a2a',
            borderRadius: '10px',
            padding: '12px 44px 12px 16px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            fontFamily: 'sans-serif'
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: '32px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 1
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Result count when searching */}
      {query && (
        <p style={{ textAlign: 'center', color: '#555', fontSize: '0.85rem', marginBottom: '24px' }}>
          {filtered.length === 0
            ? 'No deals found'
            : `${filtered.length} deal${filtered.length === 1 ? '' : 's'} found`}
        </p>
      )}

      {/* Deal Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 60px'
      }}>
        {filtered.map(product => {
          const saved = product.target_price > 0
            ? Math.round(((product.target_price - product.current_price) / product.target_price) * 100)
            : 0
          const slug = slugify(product.name)

          return (
            <div key={product.id} style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #2a2a2a',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {product.image_url && (
                <div style={{
                  width: '100%',
                  height: '140px',
                  background: '#f8f8f8',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '8px' }}
                  />
                </div>
              )}
              <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#fff', margin: 0, lineHeight: 1.4 }}>
                {product.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#22c55e' }}>
                  ${product.current_price}
                </span>
                {product.target_price > product.current_price && (
                  <span style={{ color: '#555', textDecoration: 'line-through', fontSize: '1rem' }}>
                    ${product.target_price}
                  </span>
                )}
                {saved > 0 && (
                  <span style={{
                    background: '#14532d',
                    color: '#22c55e',
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontWeight: '600'
                  }}>
                    {saved}% off
                  </span>
                )}
              </div>
              <Link href={`/deals/${slug}`} style={{
                display: 'block',
                textAlign: 'center',
                background: '#22c55e',
                color: '#000',
                fontWeight: '700',
                padding: '10px',
                borderRadius: '8px',
                textDecoration: 'none',
                marginTop: 'auto',
                fontSize: '0.9rem'
              }}>
                Set Alert →
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
