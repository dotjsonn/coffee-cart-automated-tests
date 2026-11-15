import { test as base, expect } from '@playwright/test';
import { RightClickPage } from '../pages/RightClickPage';

export const test = base.extend<{ rightClickPage: RightClickPage }>({
  rightClickPage: async ({ page }, use) => {
    const rightClickPage = new RightClickPage(page);
    await rightClickPage.open();
    await expect(rightClickPage.cartLink).toHaveText('cart (0)');
    await expect(rightClickPage.checkoutButton).toHaveText('Total: $0.00');
    await expect(rightClickPage.addToCartDialog).toBeHidden();

    await use(rightClickPage);
  },
});

export { expect };
