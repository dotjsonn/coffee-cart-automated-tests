export const promoApproveData = {
  baseURL: 'https://coffee-cart.app/',
  expectedOffer: "It's your lucky day! Get an extra cup of Mocha for $4.",
  rounds: [
    {
      products: ['Cappuccino', 'Espresso Macchiato', 'Americano'],
      expectedItemCountBeforePromo: 3,
      expectedTotalBeforePromo: '$38.00',
      expectedItemCountAfterPromo: 4,
      expectedTotalAfterPromo: '$42.00',
    },
    {
      products: ['Cappuccino', 'Espresso'],
      expectedItemCountBeforePromo: 6,
      expectedTotalBeforePromo: '$71.00',
      expectedItemCountAfterPromo: 7,
      expectedTotalAfterPromo: '$75.00',
    },
  ],
} as const;
