import { test, expect } from '../fixtures/promo.fixture';
import { promoRejectData } from '../data/promo-reject.data';

test.use({
  baseURL: promoRejectData.baseURL,
  screenshot: 'on',
  trace: 'retain-on-failure',
});

test('customer can reject successive promos at three and six cart items', async ({ promoPage }) => {
  const { rounds, expectedOffer } = promoRejectData;

  for (const [index, round] of rounds.entries()) {
    await test.step(`Add coffees and verify promo ${index + 1}`, async () => {
      await promoPage.addProducts(round.products);
      await expect(promoPage.cartLink)
        .toHaveText(`cart (${round.expectedItemCountBeforePromo})`);
      await expect(promoPage.checkoutButton)
        .toHaveText(`Total: ${round.expectedTotalBeforePromo}`);
      await expect(promoPage.offerMessage).toBeVisible();
      await expect(promoPage.offerMessage).toHaveText(expectedOffer);
      await expect(promoPage.approveButton).toBeVisible();
      await expect(promoPage.rejectButton).toBeVisible();
    });

    await test.step(`Reject promo ${index + 1} and verify the cart stays the same`, async () => {
      await promoPage.rejectPromo();
      await expect(promoPage.offerMessage).toBeHidden();
      await expect(promoPage.approveButton).toBeHidden();
      await expect(promoPage.rejectButton).toBeHidden();
      await expect(promoPage.cartLink)
        .toHaveText(`cart (${round.expectedItemCountAfterPromo})`);
      await expect(promoPage.checkoutButton)
        .toHaveText(`Total: ${round.expectedTotalAfterPromo}`);
    });
  }
});
