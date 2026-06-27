import { createClient } from '@supabase/supabase-js'
import Anthropic from '@anthropic-ai/sdk'

const supabase = createClient(
  'https://vqjrwdnffqzwhzjswvic.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

async function generateDescription(productName, currentPrice, originalPrice) {
  const saved = Math.round(((originalPrice - currentPrice) / originalPrice) * 100)

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    messages: [{
      role: 'user',
      content: `Write a 2-sentence product description for "${productName}" that is currently on sale for $${currentPrice} (down from $${originalPrice}, ${saved}% off). Be specific about what makes this product great. No marketing fluff. Sound like a knowledgeable friend recommending it. Do not mention the price or discount in the description.`
    }]
  })

  return response.content[0].text
}

async function main() {
  const { data: products } = await supabase
    .from('products')
    .select('id, name, current_price, target_price')
    .is('description', null)

  console.log(`Generating descriptions for ${products.length} products...`)

  for (const product of products) {
    try {
      const description = await generateDescription(
        product.name,
        product.current_price,
        product.target_price
      )

      await supabase
        .from('products')
        .update({ description })
        .eq('id', product.id)

      console.log(`✅ ${product.name}`)
      console.log(`   ${description}\n`)

      await new Promise(r => setTimeout(r, 500))
    } catch (e) {
      console.error(`❌ ${product.name}: ${e.message}`)
    }
  }

  console.log('Done.')
}

main()
