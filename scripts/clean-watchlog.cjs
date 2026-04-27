const fs = require('fs')

const inputPath = '../src/_data/watchlog.merged.json'
const outputPath = '../src/_data/watchlog.cleaned.json'

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
const entries = Array.isArray(data.entries) ? data.entries : []

function makeKey (entry) {
  return [
    entry.type || '',
    entry.tmdbId || '',
    entry.watchedOn || '',
    entry.season || '',
    entry.episode || '',
    entry.displayAs || ''
  ].join('|')
}

function cleanEntry (entry) {
  const cleaned = {
    rewatch: Boolean(entry.rewatch),
    type: entry.type,
    tmdbId: Number(entry.tmdbId),
    watchedOn: entry.watchedOn
  }

  if (entry.type === 'tv') {
    cleaned.season = Number(entry.season)
    cleaned.episode = Number(entry.episode)
  }

  if (entry.rating !== undefined && entry.rating !== null && entry.rating !== '') {
    cleaned.rating = Number(entry.rating)
  }

  if (entry.displayAs) {
    cleaned.displayAs = entry.displayAs
  }

  return cleaned
}

const cleanedMap = new Map()

for (const entry of entries) {
  if (!entry.type || !entry.tmdbId || !entry.watchedOn) continue

  if (entry.type === 'tv' && (!entry.season || !entry.episode)) continue

  const cleaned = cleanEntry(entry)
  const key = makeKey(cleaned)

  if (!cleanedMap.has(key)) {
    cleanedMap.set(key, cleaned)
  }
}

const cleanedEntries = Array.from(cleanedMap.values()).sort((a, b) => {
  return new Date(b.watchedOn) - new Date(a.watchedOn)
})

fs.writeFileSync(
  outputPath,
  JSON.stringify({ entries: cleanedEntries }, null, 2)
)

console.log(`Original entries: ${entries.length}`)
console.log(`Cleaned entries: ${cleanedEntries.length}`)
console.log(`Removed: ${entries.length - cleanedEntries.length}`)
console.log(`Saved to ${outputPath}`)
