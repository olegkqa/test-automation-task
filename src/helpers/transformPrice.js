module.exports = element => {
  return parseFloat(element.getText().replace(/\$/g, ''))
}
