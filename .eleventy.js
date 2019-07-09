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
  eleventyConfig.addPassthroughCopy('src/sitemap.xml')
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/keybase.txt')
  eleventyConfig.addPassthroughCopy('src/humans.txt')
  eleventyConfig.addPassthroughCopy('src/site.webmanifest')
  eleventyConfig.addPassthroughCopy('src/browserconfig.xml')
  eleventyConfig.addPassthroughCopy('src/.htaccess')

  // Filter source file names using a glob
  eleventyConfig.addCollection('posts', function (collection) {
    return collection.getFilteredByTag('post')
  })
  eleventyConfig.addCollection('notes', function (collection) {
    return collection.getFilteredByTag('note')
  })

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
