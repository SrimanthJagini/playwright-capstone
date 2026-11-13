import { test, expect } from '../fixtures/test.fixture';
import { createTestAccount } from './support/account';
import { TestDataReader } from '../utils/TestDataReader';

interface CheckoutData {
  payment: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  };
}

const checkoutData = TestDataReader.readJson<CheckoutData>('checkout.json');

async function prepareAuthenticatedCart(
  loginPage: import('../pages/LoginPage').LoginPage,
  productsPage: import('../pages/ProductsPage').ProductsPage,
  productName: string,
): Promise<void> {
  await loginPage.register(createTestAccount());
  await productsPage.open();
  await productsPage.addToCart(productName);
  await productsPage.viewCartFromDialog();
}

test('checkout flow displays address and order review', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await prepareAuthenticatedCart(loginPage, productsPage, 'Blue Top');
  await cartPage.proceedToCheckout();

  await expect(checkoutPage.addressDetailsHeading()).toBeVisible();
  await expect(checkoutPage.orderReviewHeading()).toBeVisible();
  await expect(checkoutPage.productRow('Blue Top')).toBeVisible();
});

test('order placement completes with payment details', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await prepareAuthenticatedCart(loginPage, productsPage, 'Blue Top');
  await cartPage.proceedToCheckout();
  await checkoutPage.placeOrder();
  await checkoutPage.submitPayment(checkoutData.payment);

  await expect(checkoutPage.orderSuccessMessage()).toBeVisible();
});
