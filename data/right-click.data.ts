export const rightClickData = {
  baseURL: 'https://coffee-cart.app/',
  product: 'Espresso',
  expectedDialogMessage: 'Add Espresso to the cart?',
  confirm: {
    expectedItemCount: 1,
    expectedTotal: '$10.00',
    expectedUnitDescription: '$10.00 x 1',
  },
  cancel: {
    expectedItemCount: 0,
    expectedTotal: '$0.00',
    expectedEmptyCartMessage: 'No coffee, go add some.',
  },
} as const;
