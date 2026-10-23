const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const sharp = require('sharp')
const { createGenerator } = require('../scripts/og-images.cjs')

const root = path.resolve(__dirname, '..')

test('cards render escaped and long titles, reuse cache and restore deleted output', async t => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'og-images-'))
  t.after(() => fs.rm(temp, { recursive: true, force: true }))
  const options = { outputDir: path.join(temp, 'out'), cacheDir: path.join(temp, 'cache') }
  let generate = await createGenerator(options)
  const titles = ['Hello world', 'Café & "quotes" <script> / 100%: design', 'A long title with words '.repeat(30), 'Unbroken'.repeat(40)]
  for (const title of titles) {
    const url = await generate(title, 'https://www.juanfernandes.uk')
    const file = path.join(options.outputDir, new URL(url).pathname)
    const metadata = await sharp(file).metadata()
    assert.equal(metadata.width, 1200)
    assert.equal(metadata.height, 630)
    assert.equal(metadata.format, 'png')
  }
  const url = await generate(titles[0], 'https://www.juanfernandes.uk')
  const filename = path.basename(new URL(url).pathname)
  const cached = path.join(options.cacheDir, filename)
  const before = await fs.stat(cached)
  await fs.rm(options.outputDir, { recursive: true })
  generate = await createGenerator(options)
  assert.equal(await generate(titles[0], 'https://www.juanfernandes.uk'), url)
  assert.equal((await fs.stat(cached)).mtimeMs, before.mtimeMs)
  assert.deepEqual(await fs.readFile(path.join(options.outputDir, 'assets/imgs/og', filename)), await fs.readFile(cached))
  assert.notEqual(await generate('Changed title', 'https://www.juanfernandes.uk'), url)
  const concurrent = await Promise.all(Array.from({length: 4}, () => generate('Concurrent', 'https://www.juanfernandes.uk')))
  assert.equal(new Set(concurrent).size, 1)
})

test('real Eleventy layouts emit local cards and explicit overrides', async t => {
  const { default: Eleventy } = await import('@11ty/eleventy')
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'og-eleventy-'))
  t.after(() => fs.rm(temp, { recursive: true, force: true }))
  const input = path.join(temp, 'src')
  const output = path.join(temp, 'dist')
  await fs.mkdir(input)
  await fs.cp(path.join(root, 'src/_includes'), path.join(input, '_includes'), { recursive: true })
  await fs.mkdir(path.join(input, '_data'))
  await fs.copyFile(path.join(root, 'src/_data/site.json'), path.join(input, '_data/site.json'))
  for (const [name, layout, extra] of [
    ['post', 'post', ''], ['note', 'post', 'tags: [notes]\n'],
    ['plain', 'base', ''], ['tag', 'blog', 'tag: design\n'],
    ['override', 'base', 'ogImage: /assets/imgs/og.jpg\nogImageAlt: My custom image\n']
  ]) {
    await fs.writeFile(path.join(input, `${name}.njk`), `---\nlayout: layouts/${layout}.njk\ntitle: 'Design & development'\n${extra}---\n<p>Example</p>`)
  }
  const configPath = path.join(temp, 'eleventy.cjs')
  await fs.writeFile(configPath, `module.exports = config => {
    require(${JSON.stringify(path.join(root, 'scripts/og-images.cjs'))}).registerOgImages(config)
    config.addFilter('dateFilter', () => 'Today')
    config.addFilter('w3DateFilter', () => '2026-10-23')
    return { dir: ${JSON.stringify({ input, output, includes: '_includes' })}, templateFormats: ['njk'] }
  }`)
  const eleventy = new Eleventy(input, output, { configPath })
  await eleventy.write()
  for (const name of ['post', 'note', 'plain', 'tag', 'override']) {
    const html = await fs.readFile(path.join(output, name, 'index.html'), 'utf8')
    assert.ok(html.includes('property="og:image"'), `${name}: ${html.slice(0, 800)}`)
    const og = html.match(/property="og:image" content="([^"]+)"/)[1]
    const twitter = html.match(/name="twitter:image" content="([^"]+)"/)[1]
    assert.equal(og, twitter)
    assert.ok(!og.includes('cloudinary'))
    if (name === 'override') {
      assert.equal(og, 'https://www.juanfernandes.uk/assets/imgs/og.jpg')
      assert.ok(html.includes('content="My custom image"'))
    } else {
      assert.match(og, /^https:\/\/www.juanfernandes.uk\/assets\/imgs\/og\/[a-f0-9]+\.png$/)
      await fs.access(path.join(output, new URL(og).pathname))
      assert.ok(html.includes('content="1200"'))
    }
  }
})
