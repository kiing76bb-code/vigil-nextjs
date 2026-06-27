import { getAllProducts, getProductBySlug, slugify, buildAffiliateUrl } from '@/lib/deals'
import AlertForm from '@/components/AlertForm'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map(p => ({ slug: slugify(p.name) }))
}

export default async function DealPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const saved = product.target_price > 0
    ? Math.round(((product.target_price - product.current_price) / product.target_price) * 100)
    : 0
  const affiliateUrl = buildAffiliateUrl(product.url)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    offers: {
      '@type': 'Offer',
      price: product.current_price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: affiliateUrl
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      {product.image_url && (
        <div style={{ margin: '16px 0' }}>
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '300px',
              objectFit: 'contain',
              background: '#f8f8f8',
              borderRadius: '12px',
              padding: '16px'
            }}
          />
        </div>
      )}
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-3xl font-bold text-green-600">${product.current_price}</span>
        {product.target_price > product.current_price && (
          <span className="text-gray-400 line-through">${product.target_price}</span>
        )}
        {saved > 0 && (
          <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">{saved}% off</span>
        )}
      </div>
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-black text-white px-6 py-3 rounded font-medium mt-4"
      >
        Buy Now
      </a>
      <AlertForm productName={product.name} />
      <p className="text-xs text-gray-400 mt-8">
        Last updated: {new Date(product.last_updated).toLocaleDateString()}
      </p>
    </main>
  )
}
