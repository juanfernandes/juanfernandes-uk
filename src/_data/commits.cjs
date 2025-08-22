const Parser = require('rss-parser')
const parser = new Parser({ timeout: 10000 })

const RSS_FEED =
  'https://github.com/juanfernandes/juanfernandes-uk/commits/main.atom'

module.exports = async () => {
  try {
    const feed = await parser.parseURL(RSS_FEED)

    const data = (feed.items || []).map(item => ({
      title: item.title,
      link: item.link,
      date: item.isoDate || item.pubDate || null
    }))

    // Return the array (keeps your existing templates happy).
    // If you prefer `commits` in your templates, return { commits: data } instead.
    return data
  } catch (err) {
    console.error('[commits.cjs] RSS fetch failed:', err.message)
    // Don’t fail the build if GitHub or network flakes out
    return []
  }
}
