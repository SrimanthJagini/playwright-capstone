import type { Locator, Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async openLogin(): Promise<void> {
    await this.page.locator('a[href="/login"]').click();
  }

  async openProducts(): Promise<void> {
    await this.page.locator('a[href="/products"]').click();
  }

  async openCart(): Promise<void> {
    await this.page.locator('a[href="/view_cart"]').first().click();
  }

  async openContactUs(): Promise<void> {
    await this.page.locator('a[href="/contact_us"]').click();
  }

  loggedInAs(name: string): Locator {
    return this.page.getByText(`Logged in as ${name}`, { exact: false });
  }

  logoutLink(): Locator {
    return this.page.locator('a[href="/logout"]');
  }
}
