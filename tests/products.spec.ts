import { test, expect } from '../fixtures/test.fixture';
import { TestDataReader } from '../utils/TestDataReader';

interface ProductData {
  searchCases: Array<{ term: string; expectedProduct: string }>;
  cartProduct: { name: string; price: string; quantity: string };
}

const productData = TestDataReader.readJson<ProductData>('products.json');

for (const searchCase of productData.searchCases) {
  test(`product search returns ${searchCase.expectedProduct}`, async ({ productsPage }) => {
    await productsPage.open();
    await productsPage.search(searchCase.term);

    await expect(productsPage.searchedProductsHeading()).toBeVisible();
    await expect(productsPage.productCard(searchCase.expectedProduct)).toBeVisible();
  });
}

test('add a product to the cart', async ({ productsPage, cartPage }) => {
  const product = productData.cartProduct;
  await productsPage.open();
  await productsPage.addToCart(product.name);
  await productsPage.viewCartFromDialog();

  await expect(cartPage.productRow(product.name)).toBeVisible();
  await expect(cartPage.productRow(product.name)).toContainText(product.price);
});

test('remove a product from the cart', async ({ productsPage, cartPage }) => {
  const product = productData.cartProduct;
  await productsPage.open();
  await productsPage.addToCart(product.name);
  await productsPage.viewCartFromDialog();
  await cartPage.removeProduct(product.name);

  await expect(cartPage.productRow(product.name)).toHaveCount(0);
});
