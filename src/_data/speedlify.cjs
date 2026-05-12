const CacheAsset = require('@11ty/eleventy-cache-assets')

module.exports = async function () {
  const url = 'https://speedesters.netlify.app/api/urls.json'

  return CacheAsset(url, {
    duration: '1w',
    type: 'json'
  })
}
