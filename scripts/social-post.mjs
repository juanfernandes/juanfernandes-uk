import fs from 'node:fs'
import Parser from 'rss-parser'

const STATE_FILE = 'scripts/social-state.json'

const FEEDS = [
  { url: 'https://www.juanfernandes.uk/rss/feed.xml', type: 'Blog' },
  { url: 'https://www.juanfernandes.uk/rss/notes.xml', type: 'Note' },
  { url: 'https://www.juanfernandes.uk/rss/stream.xml', type: 'Stream' }
]

const parser = new Parser()

function readState () {
  if (!fs.existsSync(STATE_FILE)) return { posted: [] }
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
}

function writeState (state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

function getItemDate (item) {
  return new Date(item.isoDate || item.pubDate || item.date || 0)
}

function cleanText (value = '') {
  return String(value).replace(/\s+/g, ' ').trim()
}

const MASTODON_LIMIT = 500

function buildMessage (item) {
  const type = item.socialType || 'Post'
  const title = cleanText(item.title) || 'New post'
  const link = item.link
  const summary = cleanText(item.contentSnippet || item.content || '')

  const prefix = `${type}: ${title}`
  const reserved = prefix.length + link.length + 4 // spacing/newlines
  const maxSummaryLength = MASTODON_LIMIT - reserved

  if (summary && maxSummaryLength > 20) {
    const trimmedSummary =
      summary.length > maxSummaryLength
        ? `${summary.slice(0, maxSummaryLength - 1).trim()}…`
        : summary

    return `${prefix}\n\n${trimmedSummary}\n\n${link}`
  }

  return `${prefix}\n\n${link}`
}

async function fetchFeed (url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'juanfernandes.uk RSS social poster',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*'
    }
  })

  if (!res.ok) {
    throw new Error(`Feed request failed: ${res.status} ${res.statusText}`)
  }

  const xml = await res.text()
  return parser.parseString(xml)
}

async function postToMastodon (message) {
  if (!process.env.MASTODON_INSTANCE || !process.env.MASTODON_ACCESS_TOKEN) {
    console.log('Skipping Mastodon — missing secrets')
    return null
  }

  const res = await fetch(`${process.env.MASTODON_INSTANCE}/api/v1/statuses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: message,
      visibility: 'public'
    })
  })

  if (!res.ok) {
    throw new Error(`Mastodon failed: ${res.status} ${await res.text()}`)
  }

  return res.json()
}

async function getFeedItems () {
  const items = []

  for (const feedConfig of FEEDS) {
    console.log(`Reading ${feedConfig.type} feed: ${feedConfig.url}`)

    try {
      const feed = await fetchFeed(feedConfig.url)

      for (const item of feed.items || []) {
        if (!item.link) continue

        items.push({
          ...item,
          socialType: feedConfig.type
        })
      }
    } catch (error) {
      console.warn(`Skipping ${feedConfig.type} feed: ${error.message}`)
    }
  }

  return items
}

async function main () {
  const state = readState()
  const items = await getFeedItems()

  const newItems = items
    .filter((item) => item.link && !state.posted.includes(item.link))
    .sort((a, b) => getItemDate(a) - getItemDate(b))

  if (!newItems.length) {
    console.log('No new social posts found.')
    return
  }

  for (const item of newItems) {
    const message = buildMessage(item)

    console.log(`Posting ${item.socialType}: ${item.link}`)

    await postToMastodon(message)

    state.posted.push(item.link)
  }

  writeState(state)

  console.log(`Posted ${newItems.length} item(s).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
