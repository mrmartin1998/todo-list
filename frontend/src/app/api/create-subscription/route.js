import Stripe from 'stripe';
import User from '@/app/models/User';
import dbConnect from '@/app/utils/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export async function POST(req) {
  await dbConnect();
  
  try {
    const { email, paymentMethodId } = await req.json();
    const customer = await stripe.customers.create({
      email: email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID }],
      expand: ['latest_invoice.payment_intent'],
    });

    // Update user subscription status in the database
    await User.findOneAndUpdate({ email }, { subscriptionStatus: 'premium' });

    return new Response(JSON.stringify({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
