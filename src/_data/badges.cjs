const data = require('./badges.json')

function slugify (str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

module.exports = () => {
  const badges = data.badges || []

  const sortedBadges = [...badges].sort((a, b) => {
    const dateA = new Date(a.earnedAt || 0)
    const dateB = new Date(b.earnedAt || 0)

    return dateB - dateA
  })

  const latest = sortedBadges[0] || null

  const highestLevel = [...sortedBadges]
    .filter((badge) => badge.level)
    .sort((a, b) => Number(b.level) - Number(a.level))
    .slice(0, 12)

  return {
    total: sortedBadges.length,
    badges: sortedBadges,
    latest,
    recent: sortedBadges.slice(0, 12),
    highestLevel
  }
}
