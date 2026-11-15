import { test, expect } from '../fixtures/coffeeCart.fixture';
import { checkoutData } from '../data/checkout.data';

test.use({
  baseURL: checkoutData.baseURL,
  screenshot: 'on',
  trace: 'retain-on-failure',
});

test('customer can successfully checkout', async ({ coffeeCart }) => {
  const { order, customer, expectedSuccessMessage } = checkoutData;

  await test.step('Add coffee and verify the cart', async () => {
    await coffeeCart.addProducts(order.products);
    await expect(coffeeCart.cartLink).toHaveText(`cart (${order.expectedItemCount})`);
    await expect(coffeeCart.checkoutButton).toHaveText(`Total: ${order.expectedTotal}`);
  });

  await test.step('Open checkout', async () => {
    await coffeeCart.openCheckout();
    await expect(coffeeCart.paymentHeading).toBeVisible();
    await expect(coffeeCart.paymentForm).toBeVisible();
  });

  await test.step('Submit payment details', async () => {
    await coffeeCart.submitPaymentDetails(customer);
  });

  await test.step('Verify the purchase succeeded', async () => {
    await expect(coffeeCart.successMessage).toBeVisible();
    await expect(coffeeCart.successMessage).toHaveText(expectedSuccessMessage);
    await expect(coffeeCart.paymentForm).toBeHidden();
  });
});
