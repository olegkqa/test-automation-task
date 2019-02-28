class Main {
  get phonesLink () {
    return browser.element('nav a[href="/Electronics/en-US/cell-phones"]')
  }
  get phoneTitle () {
    return browser.element('//p[text()[contains(.,"ASUS ZenFone 2 ZE551ML 16GB")]]')
  }
  get cookiesButton () {
  	return browser.element('button#cookieConsentAccept')
  }
}

module.exports = new Main()
