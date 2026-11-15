import { test, expect } from '../fixtures/rightClick.fixture';
import { rightClickData } from '../data/right-click.data';

test.use({
  baseURL: rightClickData.baseURL,
  screenshot: 'on',
  trace: 'retain-on-failure',
});

test('customer can add a coffee through the right-click dialog', async ({ rightClickPage }) => {
  const { product, expectedDialogMessage, confirm } = rightClickData;

  await test.step('Right-click the coffee and verify the confirmation dialog', async () => {
    await rightClickPage.rightClickCoffee(product);
    await expect(rightClickPage.addToCartDialog).toBeVisible();
    await expect(rightClickPage.addToCartDialog).toContainText(expectedDialogMessage);
    await expect(rightClickPage.confirmButton).toBeVisible();
    await expect(rightClickPage.cancelButton).toBeVisible();
    await expect(rightClickPage.cartLink).toHaveText('cart (0)');
    await expect(rightClickPage.checkoutButton).toHaveText('Total: $0.00');
  });

  await test.step('Confirm and verify the cart count and total', async () => {
    await rightClickPage.confirmAddToCart();
    await expect(rightClickPage.addToCartDialog).toBeHidden();
    await expect(rightClickPage.cartLink).toHaveText(`cart (${confirm.expectedItemCount})`);
    await expect(rightClickPage.checkoutButton).toHaveText(`Total: ${confirm.expectedTotal}`);
  });

  await test.step('Verify the selected coffee and quantity on the cart page', async () => {
    await rightClickPage.openCart();
    const cartItem = rightClickPage.getCartItem(product);
    await expect(cartItem).toBeVisible();
    await expect(cartItem).toContainText(product);
    await expect(cartItem).toContainText(confirm.expectedUnitDescription);
    await expect(rightClickPage.emptyCartMessage).toBeHidden();
  });
});

test('customer can cancel adding a coffee through the right-click dialog', async ({ rightClickPage }) => {
  const { product, expectedDialogMessage, cancel } = rightClickData;

  await test.step('Right-click the coffee and verify the confirmation dialog', async () => {
    await rightClickPage.rightClickCoffee(product);
    await expect(rightClickPage.addToCartDialog).toBeVisible();
    await expect(rightClickPage.addToCartDialog).toContainText(expectedDialogMessage);
  });

  await test.step('Cancel and verify the cart stays empty', async () => {
    await rightClickPage.cancelAddToCart();
    await expect(rightClickPage.addToCartDialog).toBeHidden();
    await expect(rightClickPage.cartLink).toHaveText(`cart (${cancel.expectedItemCount})`);
    await expect(rightClickPage.checkoutButton).toHaveText(`Total: ${cancel.expectedTotal}`);
  });

  await test.step('Verify no coffee was added on the cart page', async () => {
    await rightClickPage.openCart();
    await expect(rightClickPage.emptyCartMessage).toBeVisible();
    await expect(rightClickPage.emptyCartMessage).toHaveText(cancel.expectedEmptyCartMessage);
    await expect(rightClickPage.getCartItem(product)).toHaveCount(0);
  });
});
