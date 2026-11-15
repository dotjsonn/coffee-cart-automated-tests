import { test as base, expect } from '@playwright/test';
import { TranslatePage } from '../pages/TranslatePage';

export const test = base.extend<{ translatePage: TranslatePage }>({
  translatePage: async ({ page }, use) => {
    const translatePage = new TranslatePage(page);
    await translatePage.open();
    await expect(translatePage.cartLink).toHaveText('cart (0)');
    await expect(translatePage.checkoutButton).toHaveText('Total: $0.00');

    await use(translatePage);
  },
});

export { expect };
