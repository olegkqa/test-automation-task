const mainPage = require('../page-objects/main.page.js');
const productPage = require('../page-objects/product.page.js');
const checkoutPage = require('../page-objects/checkout.page.js');

describe('As an anonymous user, I want to generate an order using a coupon, so I can get a discount', function() {
	
	before(function() {
       	browser.url('/');

        mainPage.phonesLink.waitForVisible();
        mainPage.phonesLink.click();
        mainPage.cookiesButton.waitForVisible();
        mainPage.cookiesButton.click();
        mainPage.phoneTitle.waitForVisible();
        mainPage.phoneTitle.click();

        productPage.productFeatures.waitForVisible();
        productPage.addToCartButton.waitForVisible();
        productPage.addToCartButton.waitForEnabled();
        productPage.addToCartButton.click();
        productPage.goToCartButton.waitForVisible();
        productPage.goToCartButton.click();

        checkoutPage.cartSubtotalPrice.waitForVisible();
        checkoutPage.checkoutButton.waitForVisible();
        checkoutPage.checkoutButton.click();
    });

    it('should be possible to apply/remove a coupon, the price values are changed correspondingly', function () {
        checkoutPage.applyCoupon();

        var expectedDiscount = checkoutPage.calculateDiscountPrice();
        var expectedTaxes = checkoutPage.calculateTaxesPrice();
        var expectedTotal = checkoutPage.calculateTotalPrice();

        expect(checkoutPage.discount).to.equal(expectedDiscount);
        expect(checkoutPage.taxes).to.equal(expectedTaxes);
        expect(checkoutPage.total).to.equal(expectedTotal);

        checkoutPage.removeCoupon();

        expectedTaxes = checkoutPage.calculateTaxesPrice();
        expectedTotal = checkoutPage.calculateTotalPrice();

        expect(checkoutPage.discount).to.equal(checkoutPage.initialDiscount());
        expect(checkoutPage.taxes).to.equal(expectedTaxes);
        expect(checkoutPage.total).to.equal(expectedTotal);

        checkoutPage.applyCoupon();
    });

    it('should be possible to fill out the info form and go to the next step', function () {
    	var expectedDiscount = checkoutPage.calculateDiscountPrice();
    	checkoutPage.enterEmail();
    	checkoutPage.fillOutCustomerForm();
    	checkoutPage.fillOutShippingForm();
    	checkoutPage.finishOrder();
    	expect(checkoutPage.finalDiscount()).to.equal(expectedDiscount)
    });
});