import type { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  addressDetailsHeading(): Locator {
    return this.page.getByText('Address Details', { exact: true });
  }

  orderReviewHeading(): Locator {
    return this.page.getByText('Review Your Order', { exact: true });
  }

  productRow(name: string): Locator {
    return this.page.locator('table tbody tr').filter({ hasText: name });
  }

  async placeOrder(): Promise<void> {
    await this.page.getByRole('link', { name: /Place Order/i }).click();
  }

  async submitPayment(payment: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }): Promise<void> {
    await this.page.locator('input[name="name_on_card"]').fill(payment.nameOnCard);
    await this.page.locator('input[name="card_number"]').fill(payment.cardNumber);
    await this.page.locator('input[name="cvc"]').fill(payment.cvc);
    await this.page.locator('input[name="expiry_month"]').fill(payment.expiryMonth);
    await this.page.locator('input[name="expiry_year"]').fill(payment.expiryYear);
    await this.page.locator('[data-qa="pay-button"]').click();
  }

  orderSuccessMessage(): Locator {
    return this.page.getByRole('heading', { name: 'Order Placed!' });
  }
}
