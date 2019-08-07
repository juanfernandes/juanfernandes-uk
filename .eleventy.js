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
  eleventyConfig.addPassthroughCopy('src/sw.js')
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/keybase.txt')
  eleventyConfig.addPassthroughCopy('src/humans.txt')
  eleventyConfig.addPassthroughCopy('src/site.webmanifest')
  eleventyConfig.addPassthroughCopy('src/browserconfig.xml')
  eleventyConfig.addPassthroughCopy('src/android-chrome-192x192.png')
  eleventyConfig.addPassthroughCopy('src/android-chrome-512x512.png')
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png')
  eleventyConfig.addPassthroughCopy('src/favicon-16x16.png')
  eleventyConfig.addPassthroughCopy('src/favicon-32x32.png')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy('mstile-70x70.png')
  eleventyConfig.addPassthroughCopy('mstile-310x310.png')
  eleventyConfig.addPassthroughCopy('mstile-310x150.png')
  eleventyConfig.addPassthroughCopy('mstile-150x150.png')
  eleventyConfig.addPassthroughCopy('mstile-144x144.png')
  eleventyConfig.addPassthroughCopy('safari-pinned-tab.svg')
  eleventyConfig.addPassthroughCopy('src/.htaccess')
  eleventyConfig.addPassthroughCopy('src/admin/config.yml')

  eleventyConfig.addCollection('posts', function (collection) {
    return collection.getFilteredByGlob('./src/blog/*.md')
  })
  eleventyConfig.addCollection('notes', function (collection) {
    return collection.getFilteredByGlob('./src/notes/*.md')
  })
  eleventyConfig.addCollection('design', function (collection) {
    return collection.getFilteredByTag('design')
  })
  // eleventyConfig.addCollection('notes', function (collection) {
  //   return collection.getFilteredByTag('note')
  // })

  // Layout aliases
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

  // Plugins
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)

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
