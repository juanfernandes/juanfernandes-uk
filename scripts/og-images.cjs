const fs = require('node:fs/promises')
const path = require('node:path')
const { createHash } = require('node:crypto')
const sharp = require('sharp')

const root = path.resolve(__dirname, '..')
const fontFile = path.join(__dirname, 'og-assets/DejaVuSans-Bold.ttf')
const logoFile = path.join(root, 'src/assets/imgs/juanfernandes-logo.svg')
const WIDTH = 1200
const HEIGHT = 630

// Pango text accepts markup: escape post titles before passing them to sharp.
function escapeText (text) {
  return String(text).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  })[char])
}

async function createGenerator ({ outputDir, cacheDir = path.join(root, '_cache/og') }) {
  const [logo, font, source] = await Promise.all([
    fs.readFile(logoFile), fs.readFile(fontFile), fs.readFile(__filename)
  ])
  // Code, assets and sharp upgrades all invalidate the cache automatically.
  const version = createHash('sha256').update(source).update(logo).update(font)
    .update(JSON.stringify(sharp.versions)).digest('hex')
  const pending = new Map()
  let rendering = Promise.resolve()
  const logoPng = await sharp(logo).resize(92, 92).png().toBuffer()
  const targetDir = path.join(outputDir, 'assets/imgs/og')
  await Promise.all([fs.mkdir(cacheDir, { recursive: true }), fs.mkdir(targetDir, { recursive: true })])

  async function textLayer (text, size, width, colour) {
    return sharp({ text: {
      text: `<span foreground="${colour}">${escapeText(text)}</span>`,
      font: `DejaVu Sans Bold ${size}`, fontfile: fontFile,
      width, wrap: 'word-char', rgba: true, dpi: 72
    } }).png().toBuffer({ resolveWithObject: true })
  }

  async function render (title, domain) {
    let size = 76
    let heading = await textLayer(title, size, 1056, '#ffffff')
    // Fit the complete title, including unusually long words, into the title area.
    while (heading.info.height > 300 && size > 1) {
      size = Math.max(1, Math.min(size - 1, Math.floor(size * Math.sqrt(300 / heading.info.height))))
      heading = await textLayer(title, size, 1056, '#ffffff')
    }
    if (heading.info.height > 300) throw new Error('OG image title is too long to fit')
    const footer = await textLayer(domain, 27, 900, '#ffffff')
    const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <rect width="1200" height="630" fill="#393f4c"/>
      <rect width="1200" height="12" fill="#f89820"/>
      <rect x="72" y="92" width="88" height="8" fill="#f89820"/>
      <path d="M72 484H1128" stroke="#ffffff" stroke-opacity=".2"/>
    </svg>`)
    return sharp(background).composite([
      { input: heading.data, left: 72, top: 148 + Math.floor((300 - heading.info.height) / 2) },
      { input: footer.data, left: 72, top: 540 },
      { input: logoPng, left: 1036, top: 510 }
    ]).png().toBuffer()
  }

  return async function imageUrl (title, siteUrl) {
    const text = String(title || 'Juan Fernandes').replace(/\s+/g, ' ').trim() || 'Juan Fernandes'
    const domain = new URL(siteUrl).hostname.replace(/^www\./, '')
    const hash = createHash('sha256').update(JSON.stringify([version, text, domain])).digest('hex').slice(0, 24)
    const filename = `${hash}.png`
    if (!pending.has(hash)) {
      pending.set(hash, (async () => {
        const cached = path.join(cacheDir, filename)
        try {
          await fs.copyFile(cached, path.join(targetDir, filename))
        } catch (error) {
          if (error.code !== 'ENOENT') throw error
          // Keep first builds bounded when Eleventy renders many pages concurrently.
          const task = rendering.then(() => render(text, domain))
          rendering = task.catch(() => {})
          const png = await task
          await fs.writeFile(cached, png)
          await fs.writeFile(path.join(targetDir, filename), png)
        }
      })())
    }
    await pending.get(hash)
    return new URL(`/assets/imgs/og/${filename}`, siteUrl).href
  }
}

function registerOgImages (eleventyConfig) {
  let generator
  eleventyConfig.on('eleventy.before', async ({ dir }) => {
    // Recreate per build: watch rebuilds restore cached files even after output cleanup.
    generator = await createGenerator({ outputDir: path.resolve(dir.output) })
  })
  eleventyConfig.addWatchTarget('scripts/og-assets/')
  eleventyConfig.addWatchTarget('src/assets/imgs/juanfernandes-logo.svg')
  eleventyConfig.addNunjucksAsyncShortcode('socialImage', async (title, siteUrl, override, alt) => {
    let imageUrl
    if (override) {
      const url = new URL(override, siteUrl)
      if (!['https:', 'http:'].includes(url.protocol)) throw new Error('ogImage must be an HTTP(S) URL or site path')
      imageUrl = url.href
    } else {
      imageUrl = await generator(title, siteUrl)
    }
    const url = escapeText(imageUrl)
    const description = escapeText(alt || title || 'Juan Fernandes')
    return `<meta property="og:image" content="${url}" />
<meta name="twitter:image" content="${url}" />
<meta property="og:image:alt" content="${description}" />
<meta name="twitter:image:alt" content="${description}" />${override ? '' : `
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />`}`
  })
}

module.exports = { registerOgImages, createGenerator, WIDTH, HEIGHT }
