import { test, expect } from '../fixtures/promo.fixture';
import { promoCheckoutData } from '../data/promo-checkout.data';

test.use({
  baseURL: promoCheckoutData.baseURL,
  screenshot: 'on',
  trace: 'retain-on-failure',
});

for (const scenario of promoCheckoutData.scenarios) {
  test(scenario.name, async ({ promoPage }) => {
    const { order, customer, expectedOffer, expectedSuccessMessage } = promoCheckoutData;

    await test.step('Add three coffees and verify the subtotal', async () => {
      await promoPage.addProducts(order.products);
      await expect(promoPage.cartLink).toHaveText(`cart (${order.expectedItemCount})`);
      await expect(promoPage.checkoutButton).toHaveText(`Total: ${order.expectedTotal}`);
    });

    await test.step('Handle the promo and verify the final order', async () => {
      await expect(promoPage.offerMessage).toBeVisible();
      await expect(promoPage.offerMessage).toHaveText(expectedOffer);
      await expect(promoPage.approveButton).toBeVisible();
      await expect(promoPage.rejectButton).toBeVisible();

      if (scenario.promoChoice === 'accept') {
        await promoPage.approvePromo();
      } else {
        await promoPage.rejectPromo();
      }

      await expect(promoPage.offerMessage).toBeHidden();
      await expect(promoPage.approveButton).toBeHidden();
      await expect(promoPage.rejectButton).toBeHidden();
      await expect(promoPage.cartLink).toHaveText(`cart (${scenario.expectedItemCount})`);
      await expect(promoPage.checkoutButton).toHaveText(`Total: ${scenario.expectedTotal}`);
    });

    await test.step('Open checkout and submit payment details', async () => {
      await promoPage.openCheckout();
      await expect(promoPage.paymentHeading).toBeVisible();
      await expect(promoPage.paymentForm).toBeVisible();
      await promoPage.submitPaymentDetails(customer);
    });

    await test.step('Verify the purchase succeeded', async () => {
      await expect(promoPage.successMessage).toBeVisible();
      await expect(promoPage.successMessage).toHaveText(expectedSuccessMessage);
      await expect(promoPage.paymentForm).toBeHidden();
    });
  });
}
