import type { Locator, Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
  }

  async search(term: string): Promise<void> {
    await this.page.locator('#search_product').fill(term);
    await this.page.locator('#submit_search').click();
  }

  searchedProductsHeading(): Locator {
    return this.page.getByRole('heading', { name: /Searched Products/i });
  }

  productCard(name: string): Locator {
    return this.page.locator('.product-image-wrapper').filter({
      has: this.page.getByText(name, { exact: true }),
    }).first();
  }

  async addToCart(name: string): Promise<void> {
    const product = this.productCard(name);
    await product.locator('a.add-to-cart').first().click();
    await this.page.locator('#cartModal').waitFor({ state: 'visible' });
  }

  async viewCartFromDialog(): Promise<void> {
    await this.page.locator('#cartModal a[href="/view_cart"]').click();
  }

  async productCount(): Promise<number> {
    return this.page.locator('.product-image-wrapper').count();
  }
}
