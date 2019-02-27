const mainPage = require('../page-objects/main.page.js');
const productPage = require('../page-objects/product.page.js');
const checkoutPage = require('../page-objects/checkout.page.js');

describe('As an anonymous user, I want to generate an order using a coupon, so I can get a discount', function() {
    it('should be possible to checkout', function () {
        browser.url('/');
        mainPage.phonesLink.waitForVisible();
        mainPage.phonesLink.click();
        mainPage.cookiesButton.waitForVisible();
        mainPage.cookiesButton.click();
        mainPage.phoneTitle.waitForVisible();
        mainPage.phoneTitle.click();
        productPage.productFeatures.waitForVisible();
        productPage.addToCartButton.waitForVisible();
        productPage.addToCartButton.click();
        productPage.goToCartButton.waitForVisible();
        productPage.goToCartButton.click();
        checkoutPage.cartSubtotalPrice.waitForVisible();
        let price = checkoutPage.cartSubtotalPrice.getText().replace(/\$/g,'')
        assert.equal(price, '95.00');
        checkoutPage.checkoutButton.waitForVisible();
        checkoutPage.checkoutButton.click();
        checkoutPage.applyCoupon();
        checkoutPage.checkDiscountPrice();
        checkoutPage.checkTaxesPrice();
    });
});