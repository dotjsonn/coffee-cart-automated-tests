import { type Locator, type Page } from '@playwright/test';
import { CoffeeCartPage } from './CoffeeCartPage';

export class RightClickPage extends CoffeeCartPage {
  readonly addToCartDialog: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(private readonly browserPage: Page) {
    super(browserPage);
    this.addToCartDialog = browserPage.getByRole('dialog');
    this.confirmButton = this.addToCartDialog.getByRole('button', {
      name: 'Yes',
      exact: true,
    });
    this.cancelButton = this.addToCartDialog.getByRole('button', {
      name: 'No',
      exact: true,
    });
    this.emptyCartMessage = browserPage.getByText('No coffee, go add some.', {
      exact: true,
    });
  }

  async rightClickCoffee(product: string) {
    await this.browserPage.getByLabel(product, { exact: true }).click({ button: 'right' });
  }

  async confirmAddToCart() {
    await this.confirmButton.click();
  }

  async cancelAddToCart() {
    await this.cancelButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  getCartItem(product: string): Locator {
    return this.browserPage.getByRole('listitem').filter({
      has: this.browserPage.getByRole('button', {
        name: `Add one ${product}`,
        exact: true,
      }),
    });
  }
}
