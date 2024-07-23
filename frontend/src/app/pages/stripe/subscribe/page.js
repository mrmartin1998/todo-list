// frontend/src/app/pages/stripe/subscribe/page.js

'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const SubscribeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: email,
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, paymentMethodId: paymentMethod.id }),
      });

      const subscription = await response.json();

      if (subscription.error) {
        setMessage('Subscription failed: ' + subscription.error);
        return;
      }

      const { error: confirmError } = await stripe.confirmCardPayment(subscription.clientSecret);
      if (confirmError) {
        setMessage('Subscription failed: ' + confirmError.message);
      } else {
        setMessage('Subscription successful!');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('Error subscribing. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
      <h1 className="text-2xl font-bold mb-6 text-black">Subscribe to Premium</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
          required
        />
      </div>
      <div className="mb-4">
        <CardElement className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
        disabled={!stripe}
      >
        Subscribe
      </button>
    </form>
  );
};

const SubscribePage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <Elements stripe={stripePromise}>
      <SubscribeForm />
    </Elements>
  </div>
);

export default SubscribePage;
