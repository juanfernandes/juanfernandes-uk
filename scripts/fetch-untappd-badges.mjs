import fs from 'node:fs/promises'
import path from 'node:path'
import 'dotenv/config'

const username = process.env.UNTAPPD_USERNAME
const clientId = process.env.UNTAPPD_CLIENT_ID
const clientSecret = process.env.UNTAPPD_CLIENT_SECRET

const outputPath = path.resolve('src/_data/badges.json')

if (!username || !clientId || !clientSecret) {
  console.error('Missing UNTAPPD_USERNAME, UNTAPPD_CLIENT_ID or UNTAPPD_CLIENT_SECRET')
  process.exit(1)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function toIsoDate (value) {
  if (!value) return null

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toISOString()
}

async function fetchPage (offset = 0) {
  const url = new URL(`https://api.untappd.com/v4/user/badges/${username}`)

  url.searchParams.set('client_id', clientId)
  url.searchParams.set('client_secret', clientSecret)
  url.searchParams.set('limit', '50')
  url.searchParams.set('offset', String(offset))
  url.searchParams.set('sort', 'all')

  const res = await fetch(url)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Untappd API error ${res.status}: ${text}`)
  }

  return res.json()
}

function getBadgeImage (badge) {
  const media = badge.media || {}

  const levelItem = Array.isArray(badge.levels?.items)
    ? badge.levels.items[0]
    : null

  const levelMedia = levelItem?.media || {}

  return (
    media.badge_image_lg ||
    media.badge_image_md ||
    media.badge_image_sm ||
    levelMedia.badge_image_lg ||
    levelMedia.badge_image_md ||
    levelMedia.badge_image_sm ||
    null
  )
}

function normaliseBadge (badge) {
  const levels = Array.isArray(badge.levels?.items)
    ? badge.levels.items
    : []

  return {
    id: badge.badge_id,
    userBadgeId: badge.user_badge_id,
    checkinId: badge.checkin_id,

    name: badge.badge_name,
    description: badge.badge_description,
    hint: badge.badge_hint || null,

    image: getBadgeImage(badge),

    isLevel: badge.is_level || false,
    levelCount: badge.levels?.count || levels.length || 0,

    levels: levels.map((level) => ({
      id: level.badge_id,
      actualBadgeId: level.actual_badge_id,
      checkinId: level.checkin_id,
      name: level.badge_name,
      description: level.badge_description,
      image: getBadgeImage(level),
      earnedAt: toIsoDate(level.created_at)
    })),

    categoryId: badge.category_id,

    badgePack: badge.badge_pack || 0,
    badgePackName: badge.badge_pack_name || null,
    badgePackProgress: badge.badge_pack_progress || null,

    earnedAt: toIsoDate(badge.earned_at || badge.created_at),
    createdAt: toIsoDate(badge.created_at)
  }
}

async function run () {
  let offset = 0
  let allBadges = []

  while (true) {
    console.log(`Fetching badges from offset ${offset}...`)

    const data = await fetchPage(offset)
    const items = data?.response?.items || []

    console.log(`Found ${items.length} badges`)

    if (!items.length) break

    allBadges.push(...items.map(normaliseBadge))

    if (items.length < 50) break

    offset += 50

    await sleep(1000)
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true })

  await fs.writeFile(
    outputPath,
    JSON.stringify(
      {
        lastUpdated: new Date().toISOString(),
        total: allBadges.length,
        badges: allBadges
      },
      null,
      2
    )
  )

  console.log(`Saved ${allBadges.length} badges to ${outputPath}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
