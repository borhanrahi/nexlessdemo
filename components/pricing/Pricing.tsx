'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { twMerge } from "tailwind-merge";
import { useStripe } from '@stripe/react-stripe-js';
import { supabase } from '@/lib/supabase';

// Define the classNames function
function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const Switch = ({
  checked,
  setChecked,
}: {
  checked: boolean,
  setChecked: (checked: boolean) => void,
}) => {
  return (
    <form className="flex space-x-4 antialiased items-center">
      <p className="font-medium text-black dark:text-neutral-300">Monthly</p>
      <label
        htmlFor="checkbox"
        className={twMerge(
          "h-7 px-1 flex items-center border border-transparent shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-full w-[60px] relative cursor-pointer transition duration-200",
          checked ? "bg-cyan-500" : "bg-slate-700 border-slate-500"
        )}
      >
        <motion.div
          initial={{
            width: "20px",
            x: checked ? 0 : 32,
          }}
          animate={{
            height: ["20px", "10px", "20px"],
            width: ["20px", "30px", "20px", "20px"],
            x: checked ? 32 : 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          key={String(checked)}
          className={twMerge(
            "h-[20px] block rounded-full bg-white shadow-md z-10"
          )}
        ></motion.div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="hidden"
          id="checkbox"
        />
      </label>
      <p className="font-medium text-black dark:text-neutral-300">Annually</p>
    </form>
  );
};

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]

const tiers = [
  {
    name: 'Freelancer',
    id: 'tier-freelancer',
    href: '#',
    price: { monthly: '$15', annually: '$144' },
    description: 'The essentials to provide your best work for clients.',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    featured: false,
    cta: 'Buy plan',
  },
  {
    name: 'Startup',
    id: 'tier-startup',
    href: '#',
    price: { monthly: '$30', annually: '$288' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    featured: false,
    cta: 'Buy plan',
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: 'Custom', annually: 'Custom' }, // Correct structure
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom reporting tools',
    ],
    featured: true,
    cta: 'Contact sales',
  },
]

// Define a type or interface for the tier if not already defined
interface Tier {
  name: string;
  id: string;
  href: string;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: string[];
  featured: boolean;
  cta: string;
}

export default function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[0])
  const [isChecked, setIsChecked] = useState(false)
  const stripe = useStripe();

  const handleToggle = () => {
    setIsChecked(!isChecked)
    setFrequency(isChecked ? frequencies[0] : frequencies[1])
  }

  const handlePurchase = async (tier: Tier) => {
    if (!stripe) return;

    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: parseFloat(
          String(tier.price[frequency.value as keyof typeof tier.price]).replace('$', '')
        ),
        name: tier.name,
      }),
    });

    const session = await response.json();

    // Store the subscription information in Supabase
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Error getting user:', userError);
      return;
    }

    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userData.user.id,
        plan_name: tier.name,
        price: parseFloat(String(tier.price[frequency.value as keyof typeof tier.price]).replace('$', '')),
        frequency: frequency.value,
      });

    if (subscriptionError) {
      console.error('Error storing subscription:', subscriptionError);
    }

    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-zinc-900 dark:text-zinc-100">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in.
          Explicabo id ut laborum.
        </p>
        <div className="mt-16 flex justify-center">
          <Switch checked={isChecked} setChecked={handleToggle} />
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-zinc-200 dark:ring-zinc-700 bg-white dark:bg-zinc-800',
                'rounded-3xl p-8 ring-1 xl:p-10',
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? 'text-white' : 'text-zinc-900 dark:text-white',
                  'text-lg font-semibold leading-8',
                )}
              >
                {tier.name}
              </h3>
              <p className={classNames(tier.featured ? 'text-gray-300' : 'text-zinc-600 dark:text-zinc-300', 'mt-4 text-sm leading-6')}>
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-zinc-900 dark:text-white',
                    'text-4xl font-bold tracking-tight',
                  )}
                >
                  {typeof tier.price === 'string' ? tier.price : tier.price[frequency.value as keyof typeof tier.price]}
                </span>
                {typeof tier.price !== 'string' ? (
                  <span
                    className={classNames(
                      tier.featured ? 'text-gray-300' : 'text-zinc-600 dark:text-zinc-300',
                      'text-sm font-semibold leading-6',
                    )}
                  >
                    {frequency.priceSuffix}
                  </span>
                ) : null}
              </p>
              <a
                onClick={() => handlePurchase(tier)}
                aria-describedby={tier.id}
                className={twMerge(
                  classNames(
                    tier.featured
                      ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                      : 'bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 focus-visible:outline-zinc-900',
                    'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  ),
                  'cool-cursor-effect'
                )}
              >
                {tier.cta}
              </a>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-gray-300' : 'text-zinc-600 dark:text-zinc-300',
                  'mt-8 space-y-3 text-sm leading-6 xl:mt-10',
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      aria-hidden="true"
                      className={classNames(tier.featured ? 'text-white' : 'text-zinc-900 dark:text-white', 'h-6 w-5 flex-none')}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Add this CSS at the end of the file or in a separate CSS file
const styles = `
  @keyframes cursorEffect {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  .cool-cursor-effect {
    cursor: none;
    position: relative;
    overflow: hidden;
  }

  .cool-cursor-effect::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff);
    background-size: 200% 200%;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    animation: cursorEffect 1.5s ease infinite;
  }

  .cool-cursor-effect:hover::before {
    opacity: 0.3;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}