"use client"

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to create checkout session');
        return;
      }

      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

      if (error) {
        console.error('Stripe redirect error:', error);
      }
    } catch (error) {
      console.error('Error during checkout process:', error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Pay $5</button>
    </div>
  );
}
