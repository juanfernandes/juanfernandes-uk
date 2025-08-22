const Parser = require('rss-parser')
const parser = new Parser({ timeout: 10000 })

const RSS_FEED =
  'https://www.instapaper.com/starred/rss/644253/FzH81iaEJdLENYr6qVBpZx9Go'

module.exports = async () => {
  try {
    const feed = await parser.parseURL(RSS_FEED)

    const data = (feed.items || []).map((article) => {
      return {
        title: article.title,
        description: article.description, // excerpt
        link: article.link,
        date: article.isoDate || article.pubDate || null
      }
    })

    return data // or return { read: data } if your templates expect a key
  } catch (err) {
    console.error('[read.cjs] RSS fetch failed:', err.message)
    return [] // don’t break the build on network issues
  }
}
