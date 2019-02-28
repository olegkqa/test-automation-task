module.exports = (elem) => {
  const ms = 60000

  browser.waitUntil(
    () => elem.isVisible() === false,
    ms,
    'expected to be false after 60s'
  )
}
