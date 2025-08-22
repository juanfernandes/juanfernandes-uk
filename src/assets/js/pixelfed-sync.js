// src/assets/js/pixelfed-sync.js (ESM)
import fs from 'node:fs'
import path from 'node:path'
import { postPhotoToPixelfed } from './pixelfed.js'

const changedListPath = process.argv[2] || 'changed-files.txt'
if (!fs.existsSync(changedListPath)) {
  console.log('No change list found, skipping.')
  process.exit(0)
}

// Exact dir + image extensions
const reDir = /^src\/photos\/content\/photos\//i
const reExt = /\.(jpe?g|png|webp)$/i

const files = fs.readFileSync(changedListPath, 'utf8')
  .split('\n')
  .map(s => s.trim())
  .filter(Boolean)
  .filter(p => reDir.test(p) && reExt.test(p))

if (!files.length) {
  console.log('No new image files to post.')
  process.exit(0)
}

(async () => {
  for (const filePath of files) {
    try {
      const filename = path.basename(filePath)
      const caption = `New photo on the site: ${filename}`
      await postPhotoToPixelfed({
        filePath,
        altText: caption,
        caption,
        visibility: 'public'
      })
      console.log(`✅ Posted ${filePath}`)
    } catch (e) {
      console.error(`❌ Failed ${filePath}: ${e.message}`)
    }
  }
})()
