import { test, expect } from '../fixtures/promo.fixture';
import { promoApproveData } from '../data/promo-approve.data';

test.use({
  baseURL: promoApproveData.baseURL,
  screenshot: 'on',
  trace: 'retain-on-failure',
});

test('customer can accept successive promos at three and six cart items', async ({ promoPage }) => {
  const { rounds, expectedOffer } = promoApproveData;

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

    await test.step(`Accept promo ${index + 1} and verify the discounted total`, async () => {
      await promoPage.approvePromo();
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
