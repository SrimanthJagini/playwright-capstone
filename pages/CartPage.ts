import type { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
  }

  productRow(name: string): Locator {
    return this.page.locator('#cart_info_table tbody tr').filter({ hasText: name });
  }

  async removeProduct(name: string): Promise<void> {
    await this.productRow(name).locator('.cart_quantity_delete').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByText('Proceed To Checkout', { exact: true }).click();
  }

  emptyCartMessage(): Locator {
    return this.page.getByText(/Cart is empty/i);
  }
}
