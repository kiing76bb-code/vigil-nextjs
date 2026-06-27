import { supabase } from './supabase'

export type Product = {
  id: string
  name: string
  current_price: number
  target_price: number
  url: string
  last_updated: string
  image_url?: string
  description?: string
}

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, current_price, target_price, url, last_updated, image_url, description')
  if (error) throw error
  return data ?? []
}

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts()
  return products.find(p => slugify(p.name) === slug) ?? null
}

export function buildAffiliateUrl(url: string): string {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('amazon.com')) {
      parsed.searchParams.set('tag', 'vigildrop-20')
      return parsed.toString()
    }
    const skimlinksId = process.env.NEXT_PUBLIC_SKIMLINKS_ID
    if (skimlinksId) {
      return `https://go.skimresources.com?id=${skimlinksId}XNW&url=${encodeURIComponent(url)}`
    }
    return url
  } catch {
    return url
  }
}
