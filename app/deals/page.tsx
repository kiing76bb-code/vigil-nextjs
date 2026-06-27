import { getAllProducts, slugify } from '@/lib/deals'
import Link from 'next/link'

export const revalidate = 3600

export default async function DealsPage() {
  const products = await getAllProducts()

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>

      {/* Nav */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        borderBottom: '1px solid #1a1a1a'
      }}>
        <Link href="/" style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '0.2em', color: 'white', textDecoration: 'none' }}>
          VIGIL
        </Link>
        <a
          href="https://chromewebstore.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#22c55e',
            color: '#000',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.85rem'
          }}
        >
          Add to Chrome — Free
        </a>
      </nav>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '0.1em', marginBottom: '12px' }}>
          Live Price Drops
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
          Never overpay. Get alerted the moment prices drop.
        </p>
      </div>

      {/* Deal Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 60px'
      }}>
        {products.map(product => {
          const saved = product.target_price > 0
            ? Math.round(((product.target_price - product.current_price) / product.target_price) * 100)
            : 0
          const slug = slugify(product.name)

          return (
            <div key={product.id} style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '24px',
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
                  justifyContent: 'center'
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

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #1a1a1a' }}>
        <p style={{ color: '#444', fontSize: '0.75rem' }}>
          Links support Vigil via affiliate commission at no cost to you.
        </p>
      </div>

    </main>
  )
}
