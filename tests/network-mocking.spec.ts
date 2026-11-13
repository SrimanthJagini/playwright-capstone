import { test, expect } from '../fixtures/test.fixture';

test('product listing can be isolated with a mocked network response', async ({ page }) => {
  await page.route('**/products', route =>
    route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: '<!doctype html><html><head><title>Mock Products</title></head><body><h1>Mocked Product Listing</h1></body></html>',
    }),
  );

  await page.goto('/products');

  await expect(page.getByRole('heading', { name: 'Mocked Product Listing' })).toBeVisible();
});
