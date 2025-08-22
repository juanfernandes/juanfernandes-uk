import { postPhotoToPixelfed } from './pixelfed.js'
import fs from 'node:fs'

const changedListPath = process.argv[2] || 'changed-files.txt'
if (!fs.existsSync(changedListPath)) {
  console.log('No change list found, skipping.')
  process.exit(0)
}

const files = fs.readFileSync(changedListPath, 'utf8')
  .split('\n')
  .map(s => s.trim())
  .filter(Boolean)
  // limit to your images folder(s)
  .filter(p => p.startsWith('src/photos/') || p.startsWith('content/photos/'))
  // only images:
  .filter(p => /\.(jpe?g|png|webp)$/i.test(p))

if (!files.length) {
  console.log('No new image files to post.')
  process.exit(0)
}

(async () => {
  for (const filePath of files) {
    try {
      const caption = `New photo on the site: ${filePath.split('/').pop()}`
      await postPhotoToPixelfed({
        filePath,
        altText: caption,
        caption,
        tags: ['photography'],
        visibility: 'public'
      })
      console.log(`✅ Posted ${filePath}`)
    } catch (e) {
      console.error(`❌ Failed ${filePath}:`, e.message)
    }
  }
})()
