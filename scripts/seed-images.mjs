import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vqjrwdnffqzwhzjswvic.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

async function getImageUrl(productName) {
  try {
    const query = encodeURIComponent(`${productName} product white background`)

    // Step 1: get vqd token
    const initRes = await fetch(
      `https://duckduckgo.com/?q=${query}&iax=images&ia=images`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    )
    const initText = await initRes.text()
    const vqdMatch = initText.match(/vqd=['"]([^'"]+)['"]/)
    if (!vqdMatch) throw new Error('No vqd token')

    const vqd = vqdMatch[1]
    const imgRes = await fetch(
      `https://duckduckgo.com/i.js?q=${query}&vqd=${vqd}&f=,,,,,&p=1`,
      { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://duckduckgo.com/' } }
    )
    const imgData = await imgRes.json()
    if (imgData.results && imgData.results.length > 0) {
      return imgData.results[0].image
    }
  } catch (e) {
    console.error(`  DDG failed for "${productName}": ${e.message}`)
  }
  return null
}

async function main() {
  const sqlOnly = !SERVICE_KEY

  if (sqlOnly) {
    console.log('No SUPABASE_SERVICE_ROLE_KEY — running in SQL-output mode.\n')
  }

  // Fetch product list (anon key is fine for reads)
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxanJ3ZG5mZnF6d2h6anN3dmljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDQ5MDIsImV4cCI6MjA5Njc4MDkwMn0.Rzpn_wtzWMCsGMVQlNnbtBuHPf-afeamkM0a_guKwsE'
  const readClient = createClient(SUPABASE_URL, anonKey)
  const { data: products, error } = await readClient.from('products').select('id, name')
  if (error) throw error

  const writeClient = SERVICE_KEY ? createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } }) : null
  const sqlLines = []
  let ok = 0, fail = 0

  for (const product of products) {
    process.stdout.write(`Fetching: ${product.name} ... `)
    const imageUrl = await getImageUrl(product.name)

    if (imageUrl) {
      console.log(`✅ ${imageUrl.slice(0, 80)}`)
      if (writeClient) {
        const { error: updateError } = await writeClient
          .from('products')
          .update({ image_url: imageUrl })
          .eq('id', product.id)
        if (updateError) {
          console.error(`  DB update failed: ${updateError.message}`)
          fail++
        } else {
          ok++
        }
      } else {
        const escaped = imageUrl.replace(/'/g, "''")
        sqlLines.push(`  WHEN '${product.id}' THEN '${escaped}'`)
      }
    } else {
      console.log('❌ no image')
      fail++
    }

    await new Promise(r => setTimeout(r, 1200))
  }

  if (sqlOnly && sqlLines.length > 0) {
    console.log('\n-- Paste this into the Supabase SQL Editor:\n')
    console.log('UPDATE products SET image_url = CASE id')
    sqlLines.forEach(l => console.log(l))
    console.log('  ELSE image_url')
    console.log('END;')
  }

  console.log(`\nDone. ✅ ${ok}  ❌ ${fail}`)
}

main().catch(e => { console.error(e); process.exit(1) })
