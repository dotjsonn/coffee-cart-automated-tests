import { type Locator, type Page } from '@playwright/test';
import { CoffeeCartPage } from './CoffeeCartPage';

export class TranslatePage extends CoffeeCartPage {
  readonly emptyCartMessage: Locator;

  constructor(private readonly browserPage: Page) {
    super(browserPage);
    this.emptyCartMessage = browserPage.getByText('No coffee, go add some.', {
      exact: true,
    });
  }

  getCoffeeTitle(title: string): Locator {
    return this.browserPage.getByRole('heading', { name: title, exact: true });
  }

  async translateCoffee(title: string) {
    await this.getCoffeeTitle(title).dblclick();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
