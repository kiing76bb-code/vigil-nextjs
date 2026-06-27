import { getAllProducts, slugify } from '@/lib/deals'
import Link from 'next/link'

export const revalidate = 3600

export default async function LandingPage() {
  const products = await getAllProducts()
  const featuredProducts = products.slice(0, 6)

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
        <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '0.2em' }}>VIGIL</span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/deals" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
            Live Deals
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
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        textAlign: 'center',
        padding: '100px 20px 80px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-block',
          background: '#14532d',
          color: '#22c55e',
          fontSize: '0.75rem',
          fontWeight: '700',
          padding: '4px 12px',
          borderRadius: '999px',
          marginBottom: '24px',
          letterSpacing: '0.1em'
        }}>
          FREE PRICE TRACKER
        </div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '900',
          lineHeight: 1.1,
          marginBottom: '24px'
        }}>
          Never overpay.<br />
          <span style={{ color: '#22c55e' }}>Get alerted the moment</span><br />
          prices drop.
        </h1>
        <p style={{
          color: '#888',
          fontSize: '1.2rem',
          maxWidth: '520px',
          margin: '0 auto 40px',
          lineHeight: 1.6
        }}>
          Vigil watches thousands of products around the clock.
          The moment one hits your target price, you&apos;re first to know.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/deals"
            style={{
              background: '#22c55e',
              color: '#000',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '800',
              fontSize: '1.1rem'
            }}
          >
            Start Tracking Free →
          </Link>
          <Link href="/deals" style={{
            background: '#1a1a1a',
            color: '#fff',
            padding: '16px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            border: '1px solid #333'
          }}>
            See Live Drops →
          </Link>
        </div>
        <p style={{ color: '#444', fontSize: '0.8rem', marginTop: '16px' }}>
          Free to use. No account required.
        </p>
      </section>

      {/* How It Works */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 20px',
        borderTop: '1px solid #1a1a1a'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '800', marginBottom: '48px' }}>
          How it works
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px'
        }}>
          {[
            { step: '01', title: 'Install Vigil', desc: 'Add the free Chrome extension in seconds. No account needed.' },
            { step: '02', title: 'Set your price', desc: 'Browse any product and tell Vigil what price you want to pay.' },
            { step: '03', title: 'Get alerted', desc: 'The moment the price drops, Vigil notifies you immediately.' },
          ].map(item => (
            <div key={item.step} style={{
              background: '#111',
              borderRadius: '12px',
              padding: '32px 24px',
              border: '1px solid #1e1e1e'
            }}>
              <div style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.1em' }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Drops — Social Proof */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '60px 20px',
        borderTop: '1px solid #1a1a1a'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Live price drops</h2>
          <Link href="/deals" style={{ color: '#22c55e', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
            View all deals →
          </Link>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {featuredProducts.map(product => {
            const saved = product.target_price > 0
              ? Math.round(((product.target_price - product.current_price) / product.target_price) * 100)
              : 0
            const slug = slugify(product.name)
            return (
              <Link key={product.id} href={`/deals/${slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#111',
                  borderRadius: '10px',
                  padding: '20px',
                  border: '1px solid #1e1e1e',
                  cursor: 'pointer'
                }}>
                  {product.image_url && (
                    <div style={{
                      width: '100%',
                      height: '140px',
                      background: '#f8f8f8',
                      borderRadius: '8px',
                      marginBottom: '12px',
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
                  <p style={{ color: '#fff', fontWeight: '600', fontSize: '0.95rem', marginBottom: '10px', lineHeight: 1.4 }}>
                    {product.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#22c55e', fontSize: '1.4rem', fontWeight: '800' }}>
                      ${product.current_price}
                    </span>
                    {product.target_price > product.current_price && (
                      <span style={{ color: '#444', textDecoration: 'line-through', fontSize: '0.9rem' }}>
                        ${product.target_price}
                      </span>
                    )}
                    {saved > 0 && (
                      <span style={{
                        background: '#14532d',
                        color: '#22c55e',
                        fontSize: '0.7rem',
                        padding: '2px 6px',
                        borderRadius: '999px',
                        fontWeight: '700'
                      }}>
                        {saved}% off
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        textAlign: 'center',
        padding: '80px 20px',
        borderTop: '1px solid #1a1a1a'
      }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '16px' }}>
          Stop overpaying.
        </h2>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '1.1rem' }}>
          Join thousands of shoppers who let Vigil do the watching.
        </p>
        <Link
          href="/deals"
          style={{
            background: '#22c55e',
            color: '#000',
            padding: '16px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '800',
            fontSize: '1.1rem',
            display: 'inline-block'
          }}
        >
          Start Tracking Free →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        borderTop: '1px solid #111',
        color: '#333',
        fontSize: '0.75rem'
      }}>
        Links support Vigil via affiliate commission at no cost to you. &nbsp;·&nbsp;{' '}
        <a href="/privacy" style={{ color: '#555', textDecoration: 'none' }}>Privacy Policy</a>
        {' · '}
        <a href="/terms-of-service" style={{ color: '#555', textDecoration: 'none' }}>Terms of Service</a>
      </footer>

    </main>
  )
}
