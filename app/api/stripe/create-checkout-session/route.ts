import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
});

export async function POST(req: Request) {
  const { price, name, userId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      client_reference_id: userId,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const userId = session.client_reference_id;

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 404 });
    }

    // Fetch user data from Supabase
    const { error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      throw error;
    }

    // Update user's subscription in Supabase
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ subscription: session.amount_total ? 'Paid' : 'Free' })
      .eq('id', userId)
      .single();

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}