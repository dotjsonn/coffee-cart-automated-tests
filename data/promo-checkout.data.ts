import { checkoutData } from './checkout.data';

export const promoCheckoutData = {
  baseURL: checkoutData.baseURL,
  customer: checkoutData.customer,
  expectedSuccessMessage: checkoutData.expectedSuccessMessage,
  expectedOffer: "It's your lucky day! Get an extra cup of Mocha for $4.",
  order: {
    products: ['Espresso', 'Americano', 'Mocha'],
    expectedItemCount: 3,
    expectedTotal: '$25.00',
  },
  scenarios: [
    {
      name: 'customer can accept a promo and complete checkout',
      promoChoice: 'accept',
      expectedItemCount: 4,
      expectedTotal: '$29.00',
    },
    {
      name: 'customer can reject a promo and complete checkout',
      promoChoice: 'reject',
      expectedItemCount: 3,
      expectedTotal: '$25.00',
    },
  ],
} as const;
