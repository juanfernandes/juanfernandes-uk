const path = require('node:path')
const sass = require('sass')
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
}
const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs)

// Import filters
const rssPlugin = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const dateFilter = require('./src/_filters/date-filter')
const w3DateFilter = require('./src/_filters/w3-date-filter')
const searchIndex = require('./src/_filters/searchIndex.js')

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib)

  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath)
      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith('_')) {
        return
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [
          parsed.dir || '.',
          this.config.dir.includes
        ]
      })

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls)

      return async (data) => {
        return result.css
      }
    }
  })

  // Filters
  eleventyConfig.addFilter('dateFilter', dateFilter)
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter)
  eleventyConfig.addFilter('searchIndex', searchIndex)

  eleventyConfig.addFilter('randomItem', (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random()
    })
    return arr.slice(0, 1)
  })

  // Custom filter to find the current book
  eleventyConfig.addNunjucksFilter('findCurrentBook', function (books) {
    return books.find(book => book.current)
  })

  // Pass through
  eleventyConfig.addPassthroughCopy('README.md')
  eleventyConfig.addPassthroughCopy('src/assets/imgs')
  eleventyConfig.addPassthroughCopy('src/assets/js')
  eleventyConfig.addPassthroughCopy('src/photos/content/photos')
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/humans.txt')
  eleventyConfig.addPassthroughCopy('src/site.webmanifest')
  eleventyConfig.addPassthroughCopy('src/browserconfig.xml')
  eleventyConfig.addPassthroughCopy('src/192.png')
  eleventyConfig.addPassthroughCopy('src/512.png')
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy('src/icon.svg')
  eleventyConfig.addPassthroughCopy('.well-known/')
  eleventyConfig.addPassthroughCopy('src/Juan_Fernandes-CV.pdf')

  eleventyConfig.addCollection('posts', function (collection) {
    return collection.getFilteredByGlob('./src/blog/*.md')
  })
  eleventyConfig.addCollection('notes', function (collection) {
    return collection.getFilteredByGlob('./src/notes/*.md')
  })
  eleventyConfig.addCollection('stream', function (collection) {
    return collection.getFilteredByGlob('./src/stream/*.md')
  })
  eleventyConfig.addCollection('photos', (api) => {
    return api
      .getFilteredByGlob('src/photos/*.md') // adjust path if needed
      .sort((a, b) => b.date - a.date) // NEWEST first
  })
  eleventyConfig.addCollection('design', function (collection) {
    return collection.getFilteredByTag('design')
  })
  eleventyConfig.addCollection('changelog', function (collection) {
    return collection.getFilteredByTag('changelog')
  })
  eleventyConfig.addCollection('tagsList', (collectionApi) => {
    const tagsSet = new Set()
    collectionApi.getAll().forEach((item) => {
      if (!item.data.tags) return
      item.data.tags.forEach((tag) => tagsSet.add(tag))
    })
    return tagsSet
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
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk')
  eleventyConfig.addLayoutAlias('page-sidebar', 'layouts/page-sidebar.njk')
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
  eleventyConfig.addLayoutAlias('stream', 'layouts/stream.njk')
  eleventyConfig.addLayoutAlias('image', 'layouts/image.njk')

  // Plugins
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)

  // Sass
  eleventyConfig.addTemplateFormats('scss')

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
