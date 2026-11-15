import { test, expect } from '../fixtures/translate.fixture';
import { translateData } from '../data/translate.data';

test.use({
  baseURL: translateData.baseURL,
  screenshot: 'on',
  trace: 'retain-on-failure',
});

test('customer can translate a coffee title to Chinese without adding it to the cart', async ({ translatePage }) => {
  const { englishTitle, chineseTitle, expectedItemCount, expectedTotal, expectedEmptyCartMessage } = translateData;

  await test.step('Verify the original English title and price', async () => {
    await expect(translatePage.getCoffeeTitle(englishTitle)).toBeVisible();
  });

  await test.step('Double-click the title and verify the Chinese title and price', async () => {
    await translatePage.translateCoffee(englishTitle);
    await expect(translatePage.getCoffeeTitle(chineseTitle)).toBeVisible();
    await expect(translatePage.getCoffeeTitle(englishTitle)).toBeHidden();
  });

  await test.step('Verify translation did not add a coffee to the cart', async () => {
    await expect(translatePage.cartLink).toHaveText(`cart (${expectedItemCount})`);
    await expect(translatePage.checkoutButton).toHaveText(`Total: ${expectedTotal}`);
    await translatePage.openCart();
    await expect(translatePage.emptyCartMessage).toBeVisible();
    await expect(translatePage.emptyCartMessage).toHaveText(expectedEmptyCartMessage);
  });
});
