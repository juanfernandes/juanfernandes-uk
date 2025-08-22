module.exports = function w3DateFilter (value) {
  const dateObject = new Date(value)

  return dateObject.toISOString()
}
