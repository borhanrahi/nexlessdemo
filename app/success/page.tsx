'use client'

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Success() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Payment Successful!</h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">Thank you for your purchase. Your subscription has been activated.</p>
        {sessionId && (
          <Link href={`/account?session_id=${sessionId}`} className="text-blue-500 hover:text-blue-600">
            Go to your account page
          </Link>
        )}
      </div>
    </div>
  );
}