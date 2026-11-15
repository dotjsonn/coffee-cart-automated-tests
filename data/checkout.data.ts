export const checkoutData = {
  baseURL: 'https://coffee-cart.app/',
  customer: {
    name: 'James Noon',
    email: 'jamesnoon@example.com',
  },
  order: {
    products: ['Espresso'],
    expectedItemCount: 1,
    expectedTotal: '$10.00',
  },
  expectedSuccessMessage: 'Thanks for your purchase. Please check your email for payment.',
} as const;
