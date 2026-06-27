import { getAllProducts, getProductBySlug, slugify, buildAffiliateUrl } from '@/lib/deals'
import AlertForm from '@/components/AlertForm'
import ShareButtons from '@/components/ShareButtons'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map(p => ({ slug: slugify(p.name) }))
}

function getRetailerInfo(url: string) {
  try {
    const hostname = new URL(url).hostname
    if (hostname.includes('amazon')) return { name: 'Amazon', color: '#FF9900', bg: '#FFF8EE' }
    if (hostname.includes('walmart')) return { name: 'Walmart', color: '#0071CE', bg: '#EEF6FF' }
    if (hostname.includes('target')) return { name: 'Target', color: '#CC0000', bg: '#FFEEEE' }
    if (hostname.includes('bestbuy')) return { name: 'Best Buy', color: '#003DA5', bg: '#EEF0FF' }
    if (hostname.includes('ebay')) return { name: 'eBay', color: '#E53238', bg: '#FFEEEE' }
    return { name: 'Retailer', color: '#333', bg: '#F5F5F5' }
  } catch {
    return { name: 'Retailer', color: '#333', bg: '#F5F5F5' }
  }
}

export default async function DealPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const saved = product.target_price > 0
    ? Math.round(((product.target_price - product.current_price) / product.target_price) * 100)
    : 0
  const affiliateUrl = buildAffiliateUrl(product.url)
  const retailer = getRetailerInfo(product.url)
  const allProducts = await getAllProducts()
  const related = allProducts
    .filter(p => p.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  const shareUrl = `https://vigildrop.com/deals/${params.slug}`
  const shareText = `${product.name} is $${product.current_price} right now (${saved}% off) — set a price alert:`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `Track price drops for ${product.name}`,
    image: product.image_url,
    offers: {
      '@type': 'Offer',
      price: product.current_price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: affiliateUrl,
      seller: { '@type': 'Organization', name: retailer.name }
    }
  }

  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* Nav */}
      <nav style={{ background: '#0a0a0a', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '900', letterSpacing: '0.2em', fontSize: '1.1rem' }}>VIGIL</Link>
        <span style={{ color: '#444' }}>›</span>
        <Link href="/deals" style={{ color: '#888', textDecoration: 'none', fontSize: '0.85rem' }}>Deals</Link>
        <span style={{ color: '#444' }}>›</span>
        <span style={{ color: '#666', fontSize: '0.85rem' }}>{product.name}</span>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>

          {/* Left — Video or Image */}
          <div>
            <div style={{
              background: '#0a0a0a',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #1a1a1a'
            }}>
              {product.video_url ? (
                <video
                  src={product.video_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px'
                  }}
                />
              ) : product.image_url ? (
                <div style={{
                  background: '#f8f9fa',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  padding: '32px'
                }}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                </div>
              ) : (
                <div style={{ color: '#333', fontSize: '4rem' }}>📦</div>
              )}
            </div>
          </div>

          {/* Right — Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Commercial badge */}
            {product.video_url && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: '#0a0a0a',
                color: '#22c55e',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '999px',
                marginBottom: '4px'
              }}>
                🎬 Commercial Available
              </div>
            )}

            {/* Retailer badge */}
            <div>
              <span style={{
                background: retailer.bg,
                color: retailer.color,
                fontSize: '0.8rem',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '999px',
                border: `1px solid ${retailer.color}22`
              }}>
                Available at {retailer.name}
              </span>
            </div>

            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111', margin: 0, lineHeight: 1.3 }}>
              {product.name}
            </h1>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#16a34a' }}>
                ${product.current_price}
              </span>
              {product.target_price > product.current_price && (
                <span style={{ color: '#999', textDecoration: 'line-through', fontSize: '1.2rem' }}>
                  ${product.target_price}
                </span>
              )}
              {saved > 0 && (
                <span style={{
                  background: '#dcfce7',
                  color: '#16a34a',
                  fontSize: '0.85rem',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontWeight: '700'
                }}>
                  Save {saved}%
                </span>
              )}
            </div>

            {/* Price context */}
            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>
              📉 Down from ${product.target_price} · Tracked by Vigil
            </p>

            {/* Description */}
            {product.description && (
              <p style={{ color: '#444', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
                {product.description}
              </p>
            )}

            {/* Buy button */}
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                background: '#16a34a',
                color: '#fff',
                padding: '14px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '800',
                fontSize: '1.05rem'
              }}
            >
              Buy at {retailer.name} — ${product.current_price}
            </a>

            <p style={{ color: '#aaa', fontSize: '0.75rem', margin: 0, textAlign: 'center' }}>
              Links support Vigil via affiliate commission at no cost to you.
            </p>

            {/* Alert form */}
            <AlertForm productName={product.name} />

            {/* Share buttons */}
            <ShareButtons shareUrl={shareUrl} shareText={shareText} />

          </div>
        </div>

        {/* Related deals */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '20px', color: '#111' }}>
            More deals you might like
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {related.map(p => {
              const relSaved = p.target_price > 0
                ? Math.round(((p.target_price - p.current_price) / p.target_price) * 100)
                : 0
              return (
                <Link key={p.id} href={`/deals/${slugify(p.name)}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    border: '1px solid #eee',
                    borderRadius: '10px',
                    padding: '16px',
                    background: '#fafafa',
                    cursor: 'pointer'
                  }}>
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        style={{ width: '100%', height: '100px', objectFit: 'contain', marginBottom: '10px' }}
                      />
                    )}
                    <p style={{ color: '#111', fontSize: '0.85rem', fontWeight: '600', margin: '0 0 6px', lineHeight: 1.3 }}>
                      {p.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#16a34a', fontWeight: '800', fontSize: '1rem' }}>
                        ${p.current_price}
                      </span>
                      {relSaved > 0 && (
                        <span style={{ color: '#16a34a', fontSize: '0.7rem', fontWeight: '700' }}>
                          {relSaved}% off
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid #eee', color: '#aaa', fontSize: '0.75rem', marginTop: '40px' }}>
        <Link href="/" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '700' }}>VIGIL</Link>
        {' · '}
        <a href="/privacy" style={{ color: '#aaa', textDecoration: 'none' }}>Privacy Policy</a>
        {' · '}
        <a href="/terms-of-service" style={{ color: '#aaa', textDecoration: 'none' }}>Terms of Service</a>
      </footer>

    </main>
  )
}
