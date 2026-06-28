import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* Nav */}
      <nav style={{ padding: '20px 32px', borderBottom: '1px solid #1a1a1a' }}>
        <Link href="/" style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '0.2em', color: 'white', textDecoration: 'none' }}>
          VIGIL
        </Link>
      </nav>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          fontSize: 'clamp(5rem, 20vw, 9rem)',
          fontWeight: '900',
          color: '#1a1a1a',
          lineHeight: 1,
          marginBottom: '8px',
          letterSpacing: '-0.04em'
        }}>
          404
        </div>
        <p style={{
          fontSize: '1.2rem',
          color: '#888',
          marginBottom: '8px',
          maxWidth: '400px',
          lineHeight: 1.6
        }}>
          This deal has expired or doesn&apos;t exist.
        </p>
        <p style={{ color: '#444', fontSize: '0.9rem', marginBottom: '40px' }}>
          Prices move fast — it may have already sold out.
        </p>
        <Link
          href="/deals"
          style={{
            background: '#22c55e',
            color: '#000',
            padding: '14px 32px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '800',
            fontSize: '1.05rem',
            display: 'inline-block'
          }}
        >
          See Live Deals →
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #1a1a1a', color: '#333', fontSize: '0.75rem' }}>
        <a href="/privacy" style={{ color: '#444', textDecoration: 'none' }}>Privacy Policy</a>
        {' · '}
        <a href="/terms-of-service" style={{ color: '#444', textDecoration: 'none' }}>Terms of Service</a>
      </footer>

    </main>
  )
}
