const axios = require('axios')
const RSSParser = require('rss-parser')
const fs = require('fs')
const path = require('path')

// URL of your Instapaper RSS feed
const rssUrl = 'https://www.instapaper.com/starred/rss/644253/FzH81iaEJdLENYr6qVBpZx9Go'
// Path to your JSON file
const jsonFilePath = path.join(__dirname, 'links.json') // Adjust the path if necessary

// Function to fetch and parse the RSS feed
async function fetchRSS () {
  const parser = new RSSParser()
  try {
    const response = await axios.get(rssUrl)
    const feed = await parser.parseString(response.data)
    return feed.items
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return []
  }
}

// Function to append new links to the JSON file
async function appendLinksToJSON () {
  const newArticles = await fetchRSS()
  if (!newArticles.length) {
    console.log('No new articles found.')
    return
  }

  // Read the existing JSON file (or initialize an empty array if it doesn't exist)
  const existingLinks = fs.existsSync(jsonFilePath)
    ? JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'))
    : []

  // Filter out articles that are already in the existing JSON (based on the URL)
  const newLinks = newArticles.filter(item => {
    return !existingLinks.some(link => link.url === item.link) // Compare by URL
  })

  if (newLinks.length) {
    // Extracting relevant information including content and formatted ISO date
    const updatedLinks = newLinks.map(item => ({
      title: item.title,
      url: item.link,
      content: item['content:encoded'] || item.content || '', // Using content if available
      date: new Date(item.pubDate).toISOString() // Formatting pubDate as ISO 8601 date
    }))

    // Append new links to the existing links
    const allLinks = [...existingLinks, ...updatedLinks]
    fs.writeFileSync(jsonFilePath, JSON.stringify(allLinks, null, 2), 'utf8')
    console.log('Links appended successfully')
  } else {
    console.log('No new links to append.')
  }
}

// Run the function to append new links
appendLinksToJSON()
