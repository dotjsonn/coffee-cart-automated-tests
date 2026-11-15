export const promoRejectData = {
  baseURL: 'https://coffee-cart.app/',
  expectedOffer: "It's your lucky day! Get an extra cup of Mocha for $4.",
  rounds: [
    {
      products: ['Flat White', 'Americano', 'Mocha'],
      expectedItemCountBeforePromo: 3,
      expectedTotalBeforePromo: '$33.00',
      expectedItemCountAfterPromo: 3,
      expectedTotalAfterPromo: '$33.00',
    },
    {
      products: ['Americano', 'Cappuccino', 'Espresso'],
      expectedItemCountBeforePromo: 6,
      expectedTotalBeforePromo: '$69.00',
      expectedItemCountAfterPromo: 6,
      expectedTotalAfterPromo: '$69.00',
    },
  ],
} as const;
