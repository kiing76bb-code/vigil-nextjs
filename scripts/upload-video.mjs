#!/usr/bin/env node
/**
 * Vigil Video Upload Script
 *
 * Usage:
 * node scripts/upload-video.mjs <video-file-path> <product-name>
 *
 * Example:
 * node scripts/upload-video.mjs ~/Downloads/airpods-commercial.mp4 "AirPods Pro 2nd Gen"
 *
 * Environment variables required:
 * SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { extname } from 'path'

const SUPABASE_URL = 'https://vqjrwdnffqzwhzjswvic.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SERVICE_KEY) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY env var')
  console.error('Run: SUPABASE_SERVICE_ROLE_KEY=sb_secret_... node scripts/upload-video.mjs <file> <product>')
  process.exit(1)
}

const [,, videoPath, ...productNameParts] = process.argv
const productName = productNameParts.join(' ')

if (!videoPath || !productName) {
  console.error('❌ Usage: node scripts/upload-video.mjs <video-file-path> <product-name>')
  console.error('Example: node scripts/upload-video.mjs ~/Downloads/airpods.mp4 "AirPods Pro 2nd Gen"')
  process.exit(1)
}

const expandedPath = videoPath.replace(/^~/, process.env.HOME)

if (!existsSync(expandedPath)) {
  console.error(`❌ File not found: ${expandedPath}`)
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

async function main() {
  console.log(`\n📹 Vigil Video Upload`)
  console.log(`━━━━━━━━━━━━━━━━━━━━`)
  console.log(`File:    ${expandedPath}`)
  console.log(`Product: ${productName}\n`)

  // Step 1 — Find the product
  console.log('🔍 Finding product in Supabase...')
  const { data: products, error: findError } = await supabase
    .from('products')
    .select('id, name')
    .ilike('name', `%${productName}%`)

  if (findError) {
    console.error('❌ Supabase error:', findError.message)
    process.exit(1)
  }

  if (!products || products.length === 0) {
    console.error(`❌ No product found matching: "${productName}"`)
    console.error('Tip: Use part of the product name, e.g. "AirPods" instead of full name')
    process.exit(1)
  }

  if (products.length > 1) {
    console.log('⚠️  Multiple products found:')
    products.forEach((p, i) => console.log(`  ${i + 1}. ${p.name}`))
    console.log('\nBe more specific with the product name.')
    process.exit(1)
  }

  const product = products[0]
  console.log(`✅ Found: ${product.name} (${product.id})\n`)

  // Step 2 — Read the video file
  console.log('📂 Reading video file...')
  const fileBuffer = readFileSync(expandedPath)
  const fileName = `${product.id}-${Date.now()}${extname(expandedPath)}`
  const contentType = extname(expandedPath) === '.mp4' ? 'video/mp4' : 'video/quicktime'

  console.log(`   File size: ${(fileBuffer.length / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   Upload name: ${fileName}\n`)

  // Step 3 — Upload to Supabase Storage
  console.log('⬆️  Uploading to Supabase Storage...')
  const { error: uploadError } = await supabase.storage
    .from('vigil-videos')
    .upload(fileName, fileBuffer, {
      contentType,
      upsert: true
    })

  if (uploadError) {
    console.error('❌ Upload failed:', uploadError.message)
    process.exit(1)
  }

  // Step 4 — Get public URL
  const { data: urlData } = supabase.storage
    .from('vigil-videos')
    .getPublicUrl(fileName)

  const publicUrl = urlData.publicUrl
  console.log(`✅ Uploaded successfully`)
  console.log(`   Public URL: ${publicUrl}\n`)

  // Step 5 — Update product in database
  console.log('💾 Updating product in database...')
  const { error: updateError } = await supabase
    .from('products')
    .update({ video_url: publicUrl })
    .eq('id', product.id)

  if (updateError) {
    console.error('❌ Database update failed:', updateError.message)
    process.exit(1)
  }

  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  console.log(`✅ Product updated with video URL\n`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`🎉 Done! Video is now live at:`)
  console.log(`   https://vigildrop.com/deals/${slug}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

main().catch(console.error)
