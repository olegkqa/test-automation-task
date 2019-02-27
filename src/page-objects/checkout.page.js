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
  get couponApplyButton() {
  	return browser.element('[ng-click="$ctrl.applyCoupon($ctrl.coupon)"]');
  }
  get couponRemoveButton() {
  	return browser.element('//button/span[text()[contains(.,"Remove")]]');
  }
  get totalLines() {
  	return browser.element('.order-summary__section--total-lines');
  }
  get SubtototalPrice() {
  	return browser.element('[ng-bind="$ctrl.order.subTotal.formattedAmount"]');
  }
  get ShippingPrice() {
  	return browser.element('[ng-bind="$ctrl.order.shippingPrice.formattedAmount || $ctrl.order.shippingTotal.formattedAmount"]');
  }
  get DiscountPrice() {
  	return browser.element('[ng-bind="$ctrl.order.discountTotal.formattedAmount"]');
  }
  get TaxesPrice() {
  	return browser.element('[ng-bind="$ctrl.order.taxTotal.formattedAmount"]');
  }

  applyCoupon() {
	this.couponCodeInput.waitForVisible();
    expect(this.couponCodeInput.isVisible()).to.equal(true);
    this.couponCodeInput.setValue('test');
    this.couponApplyButton.waitForEnabled();
    this.couponApplyButton.click();
    this.couponRemoveButton.waitForVisible();
  }

  checkDiscountPrice () {
  	let actualDiscount = parseFloat(this.DiscountPrice.getText().replace(/\$/g,''));
  	let subtotal = parseFloat(this.SubtototalPrice.getText().replace(/\$/g,''));
  	let expectedDiscount = Math.floor(parseFloat(0.1*subtotal)*100)/100;
    expect(actualDiscount).to.equal(expectedDiscount);
  }

  checkTaxesPrice () {
  	this.totalLines.waitForVisible();
    browser.pause(5000);
   	let actualTaxes = parseFloat(this.TaxesPrice.getText().replace(/\$/g,''));
   	let shipping = parseFloat(this.ShippingPrice.getText().replace(/\$/g,''));
   	let discount = parseFloat(this.DiscountPrice.getText().replace(/\$/g,''));
   	let subtotal = parseFloat(this.SubtototalPrice.getText().replace(/\$/g,''));
   	let expectedTaxes = Math.floor(parseFloat(0.2*(subtotal+shipping-discount))*100)/100;
   	expect(actualTaxes).to.equal(expectedTaxes);
  }

}

module.exports = new Checkout();
