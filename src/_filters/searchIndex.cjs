/*!
 * Creates an index of searchable keywords.
 *
 * https://arielsalminen.com
 * MIT License
 *
 * @param  {String} Template contents
 * @return {String} List of keywords
 */
function indexer (text) {
  if (!text) return ''

  // Convert text to all lower case
  text = text.toLowerCase()

  // Remove HTML elements
  const plain = unescape(text.replace(/<.*?>/gis, ' '))

  // Remove other unnecessary characters from the index
  return plain
    .replace(/[\,|\?|\n|\|\\\*]/g, ' ') // remove punctuation, newlines, and special chars
    .replace(/\b(\,|"|#|'|;|:|"|"|'|'|“|”|‘|’)\b/gi, ' ') // remove punctuation at word boundaries
    .replace(/[ ]{2,}/g, ' ') // remove repeated spaces
    .trim()
}

/*!
 * Create an excerpt from the template contents.
 *
 * https://arielsalminen.com
 * MIT License
 *
 * @param  {String} Template contents
 * @return {String} The excerpt
 */
function excerpt (text) {
  if (!text) return ''

  // Remove HTML elements and headings
  const plain = unescape(text.replace(/\<h1(.*)\>(.*)\<\/h1\>/, '').replace(/<.*?>/gis, ' '))

  // Remove other unnecessary characters from the text
  return plain
    .replace(/["'#]|\n/g, ' ') // remove quotes, hashtags, and newlines
    .replace(/&(\S*)/g, '') // remove HTML entities
    .replace(/[ ]{2,}/g, ' ') // remove repeated spaces
    .replace(/[\\|]/g, '') // remove special characters
    .substring(0, 140) // Only 140 first chars
    .trim()
}
module.exports = function searchIndex (collection) {
  const search = collection
    .filter(page => !page.data.excludeFromSearch)
    .map(({ templateContent, url, data }) => {
      const { description = '', title = '' } = data

      const text = `${excerpt(description)} ${excerpt(templateContent)}`.trim()
      const keywords = `${indexer(`${title} ${templateContent}`)} ${indexer(description)}`.trim()

      return {
        url,
        title: title || 'Ariel Salminen',
        text,
        readabletitle: indexer(title),
        keywords
      }
    })

  return { search }
}
