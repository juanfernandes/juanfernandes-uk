eleventyConfig.addFilter('randomItem', (arr) => {
  arr.sort(() => {
    return 0.5 - Math.random()
  })
  return arr.slice(0, 1)
})
