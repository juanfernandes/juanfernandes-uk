// beers.cjs
const data = require('./beers.json')

function slugify (str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getMainStyle (style) {
  const s = String(style || '').toLowerCase()

  if (s.includes('stout')) return 'Stout'

  if (s.includes('porter')) return 'Porter'

  if (s.includes('ipa')) return 'IPA'

  if (s.includes('pale ale')) return 'Pale Ale'

  if (
    s.includes('lager') ||
    s.includes('pilsner') ||
    s.includes('helles')
  ) {
    return 'Lager'
  }

  if (
    s.includes('sour') ||
    s.includes('gose') ||
    s.includes('lambic')
  ) {
    return 'Sour'
  }

  if (
    s.includes('wheat') ||
    s.includes('weiss') ||
    s.includes('weizen')
  ) {
    return 'Wheat Beer'
  }

  if (
    s.includes('belgian') ||
    s.includes('dubbel') ||
    s.includes('tripel') ||
    s.includes('quad')
  ) {
    return 'Belgian'
  }

  if (s.includes('cider')) return 'Cider'

  if (s.includes('mead')) return 'Mead'

  if (s.includes('brown ale')) return 'Brown Ale'

  if (
    s.includes('red ale') ||
    s.includes('amber')
  ) {
    return 'Amber / Red Ale'
  }

  if (s.includes('barleywine')) return 'Barleywine'

  if (
    s.includes('saison') ||
    s.includes('farmhouse')
  ) {
    return 'Saison / Farmhouse'
  }

  return 'Other'
}

function groupByMainStyle (items) {
  return items.reduce((acc, beer) => {
    const mainStyle = getMainStyle(beer.style)

    if (!acc[mainStyle]) {
      acc[mainStyle] = []
    }

    acc[mainStyle].push(beer)

    return acc
  }, {})
}

module.exports = () => {
  const beers = data.beers || []

  const beersByMainStyle = groupByMainStyle(beers)

  const mainStyles = Object.keys(beersByMainStyle)
    .sort((a, b) => a.localeCompare(b))
    .map((style) => ({
      name: style,
      slug: slugify(style),
      count: beersByMainStyle[style].length
    }))

  const sortedBeers = [...beers]
    .sort((a, b) => {
      const dateA = new Date(a.lastHad || a.firstHad || 0)
      const dateB = new Date(b.lastHad || b.firstHad || 0)

      return dateB - dateA
    })

  const latest = sortedBeers[0] || null

  const recent = sortedBeers.slice(0, 12)

  return {
    total: beers.length,
    beers,
    latest,
    recent,
    mainStyles,
    beersByMainStyle
  }
}
