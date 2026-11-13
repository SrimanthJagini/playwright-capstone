import type { Locator, Page } from '@playwright/test';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactUsPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/contact_us', { waitUntil: 'domcontentloaded' });
  }

  async submit(message: ContactMessage): Promise<void> {
    await this.page.locator('input[name="name"]').fill(message.name);
    await this.page.locator('input[name="email"]').fill(message.email);
    await this.page.locator('input[name="subject"]').fill(message.subject);
    await this.page.locator('textarea[name="message"]').fill(message.message);

    this.page.once('dialog', dialog => dialog.accept());
    await this.page.getByRole('button', { name: /Submit/i }).click();
  }

  successMessage(): Locator {
    return this.page.locator('.status.alert-success');
  }
}
