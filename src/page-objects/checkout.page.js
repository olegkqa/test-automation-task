class Checkout {
  get cartSubtotalPrice() {
  	return browser.element('.cart-subtotal--price small');
  }
  get checkoutButton() {
  	return browser.element('//button[text()[contains(.,"Checkout")]]');
  }
  get couponCodeInput() {
  	return browser.element('input#CouponCode');
  }
}

module.exports = new Checkout();
