import { getAllProducts } from '@/lib/deals'
import Link from 'next/link'
import DealsSearch from '@/components/DealsSearch'

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
        <Link
          href="/deals"
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
          Start Tracking Free
        </Link>
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

      {/* Search + Deal Grid (client component) */}
      <DealsSearch products={products} />

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #1a1a1a' }}>
        <p style={{ color: '#444', fontSize: '0.75rem' }}>
          Links support Vigil via affiliate commission at no cost to you. &nbsp;·&nbsp;{' '}
          <a href="/privacy" style={{ color: '#555', textDecoration: 'none' }}>Privacy Policy</a>
          {' · '}
          <a href="/terms-of-service" style={{ color: '#555', textDecoration: 'none' }}>Terms of Service</a>
        </p>
      </div>

    </main>
  )
}
