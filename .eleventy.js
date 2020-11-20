const rssPlugin = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

// Import filters
const dateFilter = require('./src/_filters/date-filter.js')
const w3DateFilter = require('./src/_filters/w3-date-filter.js')

module.exports = function (eleventyConfig) {
  // Filters
  eleventyConfig.addFilter('dateFilter', dateFilter)
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter)

  // Pass through
  eleventyConfig.addPassthroughCopy('README.md')
  eleventyConfig.addPassthroughCopy('src/assets/imgs')
  eleventyConfig.addPassthroughCopy('src/assets/js')
  eleventyConfig.addPassthroughCopy('src/assets/css/revenge.css')
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/keybase.txt')
  eleventyConfig.addPassthroughCopy('src/humans.txt')
  eleventyConfig.addPassthroughCopy('src/site.webmanifest')
  eleventyConfig.addPassthroughCopy('src/browserconfig.xml')
  eleventyConfig.addPassthroughCopy('src/icon-192x192.png')
  eleventyConfig.addPassthroughCopy('src/icon-maskable.png')
  eleventyConfig.addPassthroughCopy('src/icon-512x512.png')
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png')
  eleventyConfig.addPassthroughCopy('src/favicon-16x16.png')
  eleventyConfig.addPassthroughCopy('src/favicon-32x32.png')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy('src/mstile-70x70.png')
  eleventyConfig.addPassthroughCopy('src/mstile-310x310.png')
  eleventyConfig.addPassthroughCopy('src/mstile-310x150.png')
  eleventyConfig.addPassthroughCopy('src/mstile-150x150.png')
  eleventyConfig.addPassthroughCopy('src/mstile-144x144.png')
  eleventyConfig.addPassthroughCopy('src/safari-pinned-tab.svg')
  eleventyConfig.addPassthroughCopy('src/_redirects')
  eleventyConfig.addPassthroughCopy('.well-known/')

  eleventyConfig.addCollection('posts', function (collection) {
    return collection.getFilteredByGlob('./src/blog/*.md')
  })
  eleventyConfig.addCollection('notes', function (collection) {
    return collection.getFilteredByGlob('./src/notes/*.md')
  })
  eleventyConfig.addCollection('photos', function (collection) {
    return collection.getFilteredByGlob('./src/photos/*.md')
  })
  eleventyConfig.addCollection('design', function (collection) {
    return collection.getFilteredByTag('design')
  })

  // Universal Shortcodes
  eleventyConfig.cloudinaryCloudName = 'juanfernandes'
  eleventyConfig.addShortcode('cloudinaryImage', function (path, transforms, alt) {
    return `<img src="https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/${transforms}/${path}" alt="${alt}">`
  })

  eleventyConfig.addShortcode('fyi', function (content) {
    return `<aside class="fyi"><p>${content}</p></aside>`
  })

  // Layout aliases
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

  // Plugins
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)

  // Watch
  eleventyConfig.addWatchTarget('./src/assets/css/')

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html']
  }
}
