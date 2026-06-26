import { getAllProducts, slugify } from '@/lib/deals'
import { MetadataRoute } from 'next'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()
  return products.map(p => ({
    url: `https://vigildrop.com/deals/${slugify(p.name)}`,
    lastModified: new Date(p.last_updated),
    changeFrequency: 'hourly',
    priority: 0.8
  }))
}
