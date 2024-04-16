const Parser = require('rss-parser')
const parser = new Parser()

const rss_feed = 'https://gitlab.com/juanfernandes/juanfernandes-uk/-/commits/main?feed_token=glft-49abf40e907f6b398340f301d659096d486a808bc7edefb7411214b764348b64-151381&format=atom'

module.exports = async function () {
  let feed = await parser.parseURL(rss_feed)

  let data = feed.items.map((commits) => {
    let title = commits.title
    let excerpt = commits.summary
    let link = commits.link

    commits.title = title
    commits.link = link
    commits.summary = excerpt

    return commits
  })

  return data
}
