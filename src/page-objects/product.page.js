class Product {
  get addToCartButton () {
  	return browser.element('button#addToCart')
  }
  get goToCartButton () {
  	return browser.element('//button/span[text()[contains(.,"Go to cart")]]')
  }
  get productFeatures () {
  	return browser.element('.product-sku')
  }
}

module.exports = new Product()
