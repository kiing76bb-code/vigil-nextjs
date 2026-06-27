import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const SUPABASE_URL = 'https://vqjrwdnffqzwhzjswvic.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

// Validate keys before doing anything
if (!SERVICE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY')
  console.error('Run: SUPABASE_SERVICE_ROLE_KEY=sb_secret_... ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-descriptions.mjs')
  process.exit(1)
}

if (!ANTHROPIC_KEY) {
  console.error('❌ Missing ANTHROPIC_API_KEY')
  console.error('Get your key at: console.anthropic.com/keys')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY })

async function generateDescription(productName, currentPrice, originalPrice) {
  const saved = originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    messages: [{
      role: 'user',
      content: `Write a 2-sentence product description for "${productName}". Be specific about what makes this product great and why someone should buy it. Sound like a knowledgeable friend recommending it. Do not mention price or discounts. Keep it under 50 words total.`
    }]
  })

  return response.content[0].text.trim()
}

async function main() {
  console.log('\n📝 Vigil Description Generator')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Connecting to Supabase...\n')

  // Test connection first
  const { data: testData, error: testError } = await supabase
    .from('products')
    .select('count')
    .limit(1)

  if (testError) {
    console.error('❌ Supabase connection failed:', testError.message)
    console.error('Check that SUPABASE_SERVICE_ROLE_KEY is the correct key for project vqjrwdnffqzwhzjswvic')
    process.exit(1)
  }

  console.log('✅ Supabase connected\n')

  // Fetch products without descriptions
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, current_price, target_price, description')
    .is('description', null)

  if (error) {
    console.error('❌ Failed to fetch products:', error.message)
    process.exit(1)
  }

  if (!products || products.length === 0) {
    console.log('✅ All products already have descriptions.')
    process.exit(0)
  }

  console.log(`Found ${products.length} products without descriptions\n`)

  let success = 0
  let failed = 0

  for (const product of products) {
    try {
      process.stdout.write(`Generating: ${product.name}...`)

      const description = await generateDescription(
        product.name,
        product.current_price,
        product.target_price
      )

      const { error: updateError } = await supabase
        .from('products')
        .update({ description })
        .eq('id', product.id)

      if (updateError) throw new Error(updateError.message)

      console.log(` ✅`)
      console.log(`   "${description}"\n`)
      success++

      // Rate limit — wait 500ms between requests
      await new Promise(r => setTimeout(r, 500))

    } catch (e) {
      console.log(` ❌ ${e.message}`)
      failed++
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✅ ${success} descriptions generated`)
  if (failed > 0) console.log(`❌ ${failed} failed`)
  console.log('\nRun a redeploy to see descriptions live on deal pages.')
  console.log('cd ~/Desktop/vigil-nextjs && git commit --allow-empty -m "chore: redeploy with product descriptions" && git push origin main\n')
}

main().catch(err => {
  console.error('❌ Unexpected error:', err.message)
  process.exit(1)
})
