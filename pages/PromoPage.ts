import { type Locator, type Page } from '@playwright/test';
import { CoffeeCartPage } from './CoffeeCartPage';

export class PromoPage extends CoffeeCartPage {
  readonly offerMessage: Locator;
  readonly approveButton: Locator;
  readonly rejectButton: Locator;

  constructor(page: Page) {
    super(page);
    this.offerMessage = page.getByText(/^It's your lucky day!/);
    this.approveButton = page.getByRole('button', {
      name: 'Yes, of course!',
      exact: true,
    });
    this.rejectButton = page.getByRole('button', {
      name: "Nah, I'll skip.",
      exact: true,
    });
  }

  async approvePromo() {
    await this.approveButton.click();
  }

  async rejectPromo() {
    await this.rejectButton.click();
  }
}
