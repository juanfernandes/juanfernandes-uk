const toggleButton = document.getElementById('search-toggle')
const searchBox = document.getElementById('search-box')
const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')
let data = []

// Toggle search box visibility
toggleButton.addEventListener('click', () => {
  searchBox.classList.toggle('hidden')
  searchInput.focus()
})

// Fetch search index
fetch('/search.json')
  .then(res => res.json())
  .then(json => {
    data = json.search
  })

// Perform search
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase()
  searchResults.innerHTML = ''

  if (query.length < 2) return

  const results = data.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.text.toLowerCase().includes(query) ||
    item.keywords.toLowerCase().includes(query)
  )

  results.forEach(result => {
    const li = document.createElement('li')
    li.innerHTML = `<a href="${result.url}">${result.title}</a>`
    searchResults.appendChild(li)
  })
})

// Toggle the .hidden class based on whether there are results:
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase()
  searchResults.innerHTML = ''

  if (query.length < 2) {
    searchResults.classList.add('hidden')
    return
  }

  const results = data.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.text.toLowerCase().includes(query) ||
    item.keywords.toLowerCase().includes(query)
  )

  if (results.length === 0) {
    searchResults.classList.add('hidden')
    return
  }

  results.forEach(result => {
    const li = document.createElement('li')
    li.innerHTML = `<a href="${result.url}">${result.title}</a>`
    searchResults.appendChild(li)
  })

  searchResults.classList.remove('hidden')
})

// Clear results on blur (optional)
// searchInput.addEventListener('blur', () => {
//   setTimeout(() => {
//     searchResults.classList.add('hidden')
//   }, 200) // small delay to allow clicking a link
// })

// Show/Hide the Clear Icon + Clear Input
const clearButton = document.getElementById('clear-search')

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase()
  searchResults.innerHTML = ''

  clearButton.style.display = query ? 'block' : 'none'

  if (query.length < 2) {
    searchResults.classList.add('hidden')
    return
  }

  const results = data.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.text.toLowerCase().includes(query) ||
    item.keywords.toLowerCase().includes(query)
  )

  if (results.length === 0) {
    searchResults.classList.add('hidden')
    return
  }

  results.forEach(result => {
    const li = document.createElement('li')
    li.innerHTML = `<a href="${result.url}">${result.title}</a>`
    searchResults.appendChild(li)
  })

  searchResults.classList.remove('hidden')
})

clearButton.addEventListener('click', () => {
  searchInput.value = ''
  clearButton.style.display = 'none'
  searchResults.innerHTML = ''
  searchResults.classList.add('hidden')
  searchInput.focus()
})
