import { type Locator, type Page } from '@playwright/test';

export type PaymentDetails = {
  name: string;
  email: string;
};

export class CoffeeCartPage {
  readonly cartLink: Locator;
  readonly checkoutButton: Locator;
  readonly paymentHeading: Locator;
  readonly paymentForm: Locator;
  readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.cartLink = page.getByRole('link', { name: 'Cart page', exact: true });
    this.checkoutButton = page.getByRole('button', {
      name: 'Proceed to checkout',
      exact: true,
    });
    this.paymentHeading = page.getByRole('heading', {
      name: 'Payment details',
      exact: true,
    });
    this.paymentForm = page.getByRole('form', { name: 'Payment form', exact: true });
    this.successMessage = page.getByText(/^Thanks for your purchase\./);
  }

  async open() {
    await this.page.goto('/');
  }

  async addProducts(products: readonly string[]) {
    for (const product of products) {
      await this.page.getByLabel(product, { exact: true }).click();
    }
  }

  async openCheckout() {
    await this.checkoutButton.click();
  }

  async submitPaymentDetails(customer: PaymentDetails) {
    await this.paymentForm.getByRole('textbox', { name: 'Name', exact: true })
      .fill(customer.name);
    await this.paymentForm.getByRole('textbox', { name: 'Email', exact: true })
      .fill(customer.email);
    await this.paymentForm.getByRole('button', { name: 'Submit', exact: true }).click();
  }
}
