const Parser = require('rss-parser')
const parser = new Parser()

const rss_feed = 'https://www.instapaper.com/starred/rss/644253/FzH81iaEJdLENYr6qVBpZx9Go'

module.exports = async function () {
  let feed = await parser.parseURL(rss_feed)

  let data = feed.items.map((article) => {
    let title = article.title
    let excerpt = article.description
    let link = article.link

    article.title = title
    article.link = link
    article.description = excerpt

    return article
  })

  return data
}
