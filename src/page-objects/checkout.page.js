const transformPrice = require('../helpers/transformPrice.js')
const waitForInvisible = require('../helpers/waitForInvisible.js')

class Checkout {
  get cartSubtotalPrice () {
  	return browser.element('.cart-subtotal--price small')
  }
  get checkoutButton () {
  	return browser.element('//button[text()[contains(.,"Checkout")]]')
  }
  get couponCodeInput () {
  	return browser.element('input#CouponCode')
  }
  get couponApplyButton () {
  	return browser.element('[ng-click="$ctrl.applyCoupon($ctrl.coupon)"]')
  }
  get couponRemoveButton () {
  	return browser.element('[ng-click="$ctrl.onRemoveCoupon({ coupon: coupon })"]')
  }
  get totalLines () {
  	return browser.element('.order-summary__section--total-lines')
  }
  get SubtototalPrice () {
  	return browser.element('[ng-bind="$ctrl.order.subTotal.formattedAmount"]')
  }
  get ShippingPrice () {
  	return browser.element('[ng-bind="$ctrl.order.shippingPrice.formattedAmount || $ctrl.order.shippingTotal.formattedAmount"]')
  }
  get DiscountPrice () {
  	return browser.element('[ng-bind="$ctrl.order.discountTotal.formattedAmount"]')
  }
  get TaxesPrice () {
  	return browser.element('[ng-bind="$ctrl.order.taxTotal.formattedAmount"]')
  }
  get TotalPrice () {
  	return browser.element('[ng-bind="$ctrl.order.total.formattedAmount"]')
  }
  get emailInput () {
    return browser.element('input#Email')
  }
  get firstNameInput () {
    return browser.element('input#FirstName')
  }
  get lastNameInput () {
    return browser.element('input#LastName')
  }
  get companyInput () {
    return browser.element('input#Organization')
  }
  get addressInput () {
    return browser.element('input#Line1')
  }
  get aptInput () {
    return browser.element('input#Line2')
  }
  get cityInput () {
    return browser.element('input#City')
  }
  get countrySelect () {
    return browser.element('.form-select')
  }
  get zipInput () {
    return browser.element('input#PostalCode')
  }
  get phoneInput () {
    return browser.element('input#Phone')
  }
  get continueButton () {
    return browser.element('[ng-click="$ctrl.nextStep()"]')
  }
  get groundShippingOption () {
    return browser.element('[id="FixedRate:Ground"]')
  }
  get loadingButton () {
    return browser.element('.btn--loading')
  }
  get billingAddress () {
    return browser.element('#BillingAddressEqualsShipping')
  }
  get finalSubtotalPrice () {
    return browser.element('[ng-bind="order.subTotal.formattedAmount"]')
  }

  enterEmail () {
    this.emailInput.setValue('olegkqa@gmail.com')
  }

  fillOutCustomerForm () {
    this.firstNameInput.setValue('test')
    this.lastNameInput.setValue('test')
    this.companyInput.setValue('test')
    this.addressInput.setValue('test')
    this.aptInput.setValue('test')
    this.cityInput.setValue('test')
    this.countrySelect.click()
    browser.waitForVisible('option[label="Albania"]')
    browser.click('option[label="Albania"]')
    this.zipInput.setValue('test')
    this.phoneInput.setValue('test')
    this.continueButton.waitForVisible()
    this.continueButton.click()
  }

  fillOutShippingForm () {
    this.groundShippingOption.waitForVisible()
    this.groundShippingOption.click()
    this.loadingButton.waitForVisible()
    this.continueButton.waitForVisible()
    browser.waitUntil(
      () => this.ShippingPrice.getText() === '$5.00',
      60000,
      'expected to be 5.00 after 60s'
    )
    this.continueButton.click()
  }

  finishOrder () {
    this.billingAddress.waitForVisible()
    this.continueButton.waitForVisible()
    browser.waitUntil(
      () => browser.isVisible('.btn--loading') === false,
      60000,
      'expected to be false after 60s'
    )
    this.continueButton.click()
    browser.waitForVisible('//h4[text()[contains(.,"Order")]]')
  }

  readPrices () {
    this.taxes = transformPrice(this.TaxesPrice)
    this.discount = transformPrice(this.DiscountPrice)
    this.subtotal = transformPrice(this.SubtototalPrice)
    this.shipping = transformPrice(this.ShippingPrice)
    this.total = transformPrice(this.TotalPrice)
  }

  applyCoupon () {
    this.couponCodeInput.waitForVisible()
    expect(this.couponCodeInput.isVisible()).to.equal(true)
    this.couponCodeInput.setValue('test')
    this.couponApplyButton.waitForEnabled()
    this.couponApplyButton.click()
    this.couponRemoveButton.waitForVisible()

    this.readPrices()
  }

  removeCoupon () {
    this.couponRemoveButton.waitForVisible()
    this.couponRemoveButton.waitForEnabled()
    this.couponRemoveButton.click()
    waitForInvisible(this.couponRemoveButton)

    this.readPrices()
  }

  finalDiscount () {
    this.finalSubtotalPrice.waitForVisible()
    this.finalSubtotal = transformPrice(this.finalSubtotalPrice)
    return Math.floor(parseFloat(0.1 * this.finalSubtotal) * 100) / 100
  }

  initialDiscount () {
    return Math.floor(parseFloat(0.05 * this.subtotal) * 100) / 100
  }

  calculateDiscountPrice () {
  	return Math.floor(parseFloat(0.1 * this.subtotal) * 100) / 100
  }

  calculateTaxesPrice () {
  	this.totalLines.waitForVisible()
   	return Math.floor(parseFloat(0.2 * (this.subtotal + this.shipping - this.discount)) * 100) / 100
  }

  calculateTotalPrice () {
  	return Math.floor(parseFloat(this.subtotal + this.shipping - this.discount + this.taxes) * 100) / 100
  }
}

module.exports = new Checkout()
