const { DateTime } = require('luxon') // Already in eleventy-base-blog

module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
    return webmentions.children.filter(entry => entry['wm-target'] === url)
  },
  isOwnWebmention: (webmention) => {
    const urls = [
      'https://www.juanfernandes.uk',
      'https://twitter.com/juanfernandes'
    ]
    const authorUrl = webmention.author ? webmention.author.url : false
    // check if a given URL is part of this site.
    return authorUrl && urls.includes(authorUrl)
  },
  size: (mentions) => {
    return !mentions ? 0 : mentions.length
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter(entry => !!entry[mentionType])
  },
  sortWebmentions: (mentions) => {
    return mentions.sort((a, b) => {
      if (a['published'] < b['published']) {
        return -1
      }
      if (a['published'] > b['published']) {
        return 1
      }
      // a must be equal to b
      return 0
    })
  }
}
