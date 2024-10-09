'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Make sure this import is correct

interface UserData {
  id: string;
  user_metadata: {
    name: string;
  };
  email?: string;
}

interface SubscriptionData {
  plan_name: string;
  price: number;
  frequency: string;
}

export default function Account() {
  const [user, setUser] = useState<UserData | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
          console.error('Error fetching user:', userError);
          throw new Error(`Failed to fetch user: ${userError.message}`);
        }

        if (user) {
          setUser({
            id: user.id,
            user_metadata: {
              name: user.user_metadata.name || ''
            },
            email: user.email
          });

          // Fetch subscription data
          const { data: subscriptionData, error: subscriptionError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (subscriptionError) {
            console.error('Error fetching subscription:', subscriptionError);
          }

          if (subscriptionData) {
            setSubscription(subscriptionData);
          }
        } else {
          throw new Error('No user found');
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        setError(`Failed to load user data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">No user data available.</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">My Account</h1>
        {searchParams.get('session_id') && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            Subscription successful! Your account has been updated.
          </div>
        )}
        <div className="mt-8 bg-white dark:bg-zinc-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-zinc-900 dark:text-white">User Information</h3>
          </div>
          <div className="border-t border-zinc-200 dark:border-zinc-700">
            <dl>
              <div className="bg-zinc-50 dark:bg-zinc-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-300">Full name</dt>
                <dd className="mt-1 text-sm text-zinc-900 dark:text-white sm:mt-0 sm:col-span-2">{user.user_metadata.name || 'N/A'}</dd>
              </div>
              <div className="bg-white dark:bg-zinc-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-300">Email address</dt>
                <dd className="mt-1 text-sm text-zinc-900 dark:text-white sm:mt-0 sm:col-span-2">{user.email || 'N/A'}</dd>
              </div>
              {subscription && (
                <>
                  <div className="bg-zinc-50 dark:bg-zinc-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-300">Subscription Plan</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-white sm:mt-0 sm:col-span-2">{subscription.plan_name}</dd>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-300">Subscription Price</dt>
                    <dd className="mt-1 text-sm text-zinc-900 dark:text-white sm:mt-0 sm:col-span-2">${subscription.price} / {subscription.frequency}</dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}