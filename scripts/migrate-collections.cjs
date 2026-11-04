
const fs = require('node:fs')
const path = require('node:path')

const collections = {
  concerts: {
    source: 'src/_data/concertsData.json',
    destination: 'src/concerts',
    key: 'entries',
    filename: (item, index) =>
      `${item.date || 'undated'}-${slugify(item.artists?.[0] || 'concert')}-${index + 1}`
  },
  lego: {
    source: 'src/_data/legoData.json',
    destination: 'src/lego',
    key: 'items',
    filename: (item, index) =>
      slugify(item.setNumber || `set-${index + 1}`)
  }
}

function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function migrate(name) {
  const config = collections[name]

  if (!config) {
    throw new Error(`Unknown collection: ${name}`)
  }

  const raw = JSON.parse(
    fs.readFileSync(config.source, 'utf8')
  )

  const items = raw[config.key]

  if (!Array.isArray(items)) {
    throw new Error(`Expected array: ${config.key}`)
  }

  const planned = items.map((item, index) => ({
    item,
    filename: `${config.filename(item, index)}.json`
  }))

  const filenames = planned.map(p => p.filename)

  if (new Set(filenames).size !== filenames.length) {
    throw new Error('Duplicate generated filenames')
  }

  fs.mkdirSync(config.destination, { recursive: true })

  for (const { filename } of planned) {
    if (fs.existsSync(path.join(config.destination, filename))) {
      throw new Error(`Already exists: ${filename}`)
    }
  }

  for (const { item, filename } of planned) {
    fs.writeFileSync(
      path.join(config.destination, filename),
      JSON.stringify(item, null, 2) + '\n'
    )
  }

  console.log(`Migrated ${items.length} ${name} entries`)
}

const name = process.argv[2]

if (!name) {
  throw new Error('Usage: node scripts/migrate-collections.cjs <name>')
}

migrate(name)
