import fs from 'node:fs'

const LINKS_FILE = 'src/_data/links.raw.json'
const STATE_FILE = 'scripts/mastodon-reading-state.json'
const MASTODON_LIMIT = 500

function readJson (file, fallback) {
  if (!fs.existsSync(file)) return fallback

  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

function writeState (state) {
  fs.writeFileSync(
    STATE_FILE,
    `${JSON.stringify(state, null, 2)}\n`,
    'utf8'
  )
}

function cleanText (value = '') {
  return String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getItemDate (item) {
  const date = Date.parse(
    item.date ||
    item.isoDate ||
    item.pubDate ||
    0
  )

  return Number.isNaN(date) ? 0 : date
}

function buildMessage (item) {
  const url = item.url
  const title = cleanText(item.title) || 'Article'

  const prefix = '📖 '
  const reserved = prefix.length + url.length + 2
  const maxTitleLength = MASTODON_LIMIT - reserved

  const trimmedTitle =
    title.length > maxTitleLength
      ? `${title.slice(0, maxTitleLength - 1).trim()}…`
      : title

  return `${prefix}${trimmedTitle}\n\n${url}`
}

async function postToMastodon (message) {
  const instance = process.env.MASTODON_INSTANCE
  const token = process.env.MASTODON_ACCESS_TOKEN

  if (!instance || !token) {
    throw new Error(
      'Missing MASTODON_INSTANCE or MASTODON_ACCESS_TOKEN'
    )
  }

  const res = await fetch(`${instance}/api/v1/statuses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: message,
      visibility: 'public'
    })
  })

  if (!res.ok) {
    throw new Error(
      `Mastodon failed: ${res.status} ${await res.text()}`
    )
  }

  return res.json()
}

async function main () {
  const links = readJson(LINKS_FILE, [])

  if (!Array.isArray(links)) {
    throw new Error(`${LINKS_FILE} does not contain an array`)
  }

  /*
   * First run:
   *
   * Treat everything already in links.raw.json as posted.
   * This prevents the entire historical archive being sent
   * to Mastodon when the automation is introduced.
   */
  if (!fs.existsSync(STATE_FILE)) {
    const existingUrls = links
      .map(item => item.url)
      .filter(Boolean)

    writeState({
      posted: existingUrls
    })

    console.log(
      `Initialised Mastodon reading state with ${existingUrls.length} existing article(s).`
    )

    console.log('No articles posted on initial run.')
    return
  }

  const state = readJson(STATE_FILE, { posted: [] })

  if (!Array.isArray(state.posted)) {
    state.posted = []
  }

  const newItems = links
    .filter(item =>
      item.url &&
      !state.posted.includes(item.url)
    )
    .sort((a, b) =>
      getItemDate(a) - getItemDate(b)
    )

  if (!newItems.length) {
    console.log('No new read articles to post.')
    return
  }

  for (const item of newItems) {
    console.log(`Posting read article: ${item.url}`)

    const message = buildMessage(item)

    await postToMastodon(message)

    /*
     * Save immediately after each successful post.
     * This reduces the chance of duplicates if a later
     * article fails.
     */
    state.posted.push(item.url)
    writeState(state)
  }

  console.log(
    `Posted ${newItems.length} read article(s) to Mastodon.`
  )
}

main().catch(error => {
  console.error('Mastodon reading poster failed:', error)
  process.exit(1)
})
