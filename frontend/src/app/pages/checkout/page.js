// frontend/src/app/pages/checkout/page.js

'use client';

import React from 'react';

const CheckoutPage = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-black">Checkout</h1>
        <button onClick={handleCheckout} className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
          Pay $5
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
