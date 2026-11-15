import { test as base, expect } from '@playwright/test';
import { CoffeeCartPage } from '../pages/CoffeeCartPage';

export const test = base.extend<{ coffeeCart: CoffeeCartPage }>({
  coffeeCart: async ({ page }, use) => {
    const coffeeCart = new CoffeeCartPage(page);
    await coffeeCart.open();
    await expect(coffeeCart.cartLink).toHaveText('cart (0)');
    await expect(coffeeCart.checkoutButton).toHaveText('Total: $0.00');

    await use(coffeeCart);
  },
});

export { expect };
