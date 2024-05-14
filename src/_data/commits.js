const Parser = require('rss-parser')
const parser = new Parser()

const rss_feed = 'https://github.com/juanfernandes/juanfernandes-uk/commits/main.atom'

module.exports = async function () {
  let feed = await parser.parseURL(rss_feed)

  let data = feed.items.map((commits) => {
    let title = commits.title
    let link = commits.link

    commits.title = title
    commits.link = link

    return commits
  })

  return data
}
