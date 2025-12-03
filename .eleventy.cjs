// .eleventy.cjs  (CommonJS, no Promises)

const path = require('node:path')
const sass = require('sass')
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')

// Plugins (CJS)
const rssPlugin = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

// Local filters (now CJS .cjs files)
const dateFilter = require('./src/_filters/date-filter.cjs')
const w3DateFilter = require('./src/_filters/w3-date-filter.cjs')
const searchIndex = require('./src/_filters/searchIndex.cjs')

const markdownLib = markdownIt({ html: true, breaks: true, linkify: true })
  .use(markdownItAttrs)

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib)

  // SCSS
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',
    useLayouts: false,
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath)
      if (parsed.name.startsWith('_')) return

      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || '.', this.config.dir.includes]
      })

      this.addDependencies(inputPath, result.loadedUrls)
      return async () => result.css
    }
  })

  // Filters
  eleventyConfig.addFilter('dateFilter', dateFilter)
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter)
  eleventyConfig.addFilter('searchIndex', searchIndex)

  eleventyConfig.addFilter('randomItem', (arr) => {
    arr.sort(() => 0.5 - Math.random())
    return arr.slice(0, 1)
  })

  eleventyConfig.addNunjucksFilter('findCurrentBook', (books) =>
    books.find(b => b.current)
  )

  // Passthrough
  eleventyConfig.addPassthroughCopy('README.md')
  eleventyConfig.addPassthroughCopy('src/assets/imgs')
  eleventyConfig.addPassthroughCopy('src/now/images')
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

  // Collections
  eleventyConfig.addCollection('posts', (c) => c.getFilteredByGlob('./src/blog/*.md'))
  eleventyConfig.addCollection('notes', (c) => c.getFilteredByGlob('./src/notes/*.md'))
  eleventyConfig.addCollection('stream', (c) => c.getFilteredByGlob('./src/stream/*.md'))
  eleventyConfig.addCollection('photos', (api) =>
    api.getFilteredByGlob('src/photos/*.md').sort((a, b) => b.date - a.date)
  )
  eleventyConfig.addCollection('design', (c) => c.getFilteredByTag('design'))
  eleventyConfig.addCollection('changelog', (c) => c.getFilteredByTag('changelog'))
  eleventyConfig.addCollection('tagsList', (c) => {
    const tagsSet = new Set()
    c.getAll().forEach((item) => {
      if (!item.data.tags) return
      item.data.tags.forEach((tag) => tagsSet.add(tag))
    })
    return tagsSet
  })

  // Shortcodes
  eleventyConfig.cloudinaryCloudName = 'juanfernandes'
  eleventyConfig.addShortcode('cloudinaryImage', (imgPath, transforms, alt) =>
    `<img src="https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/${transforms}/${imgPath}" alt="${alt}">`
  )
  eleventyConfig.addShortcode('fyi', (content) =>
    `<aside class="fyi"><p>${content}</p></aside>`
  )

  // Plugins
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addTemplateFormats('scss')

  // Layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk')
  eleventyConfig.addLayoutAlias('page', 'page.njk')
  eleventyConfig.addLayoutAlias('page-sidebar', 'page-sidebar.njk')
  eleventyConfig.addLayoutAlias('post', 'post.njk')
  eleventyConfig.addLayoutAlias('stream', 'stream.njk')
  eleventyConfig.addLayoutAlias('image', 'image.njk')

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_includes/layouts',
      output: 'dist'
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html']
  }
}
