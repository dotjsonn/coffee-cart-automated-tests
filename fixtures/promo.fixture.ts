import { test as base, expect } from '@playwright/test';
import { PromoPage } from '../pages/PromoPage';

export const test = base.extend<{ promoPage: PromoPage }>({
  promoPage: async ({ page }, use) => {
    const promoPage = new PromoPage(page);
    await promoPage.open();
    await expect(promoPage.cartLink).toHaveText('cart (0)');
    await expect(promoPage.checkoutButton).toHaveText('Total: $0.00');
    await expect(promoPage.offerMessage).toBeHidden();

    await use(promoPage);
  },
});

export { expect };
