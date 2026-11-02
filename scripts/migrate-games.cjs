
const fs = require('node:fs')
const path = require('node:path')

const source = 'src/_data/gamesData.json'
const destination = 'src/games'

const data = JSON.parse(fs.readFileSync(source, 'utf8'))

if (!Array.isArray(data.items)) {
  throw new Error('Expected gamesData.json to contain an items array')
}

function slugify (value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

fs.mkdirSync(destination, { recursive: true })

const planned = new Set()
const files = data.items.map((game, index) => {
  if (!game.title) {
    throw new Error(`Game at index ${index} has no title`)
  }

  const title = slugify(game.title)
  const platform = slugify(game.platform || 'unknown')

  let slug = title
  if (planned.has(slug)) slug = `${title}-${platform}`

  let suffix = 2
  const base = slug

  while (planned.has(slug)) {
    slug = `${base}-${suffix++}`
  }

  planned.add(slug)

  return {
    filename: `${slug}.json`,
    game
  }
})

for (const { filename } of files) {
  if (fs.existsSync(path.join(destination, filename))) {
    throw new Error(`File already exists: ${filename}`)
  }
}

for (const { filename, game } of files) {
  const output = path.join(destination, filename)

  fs.writeFileSync(
    output,
    `${JSON.stringify(game, null, 2)}\n`,
    'utf8'
  )

  console.log(`Created ${output}`)
}

console.log(`Migrated ${files.length} games`)
console.log('Original JSON file has been preserved.')
