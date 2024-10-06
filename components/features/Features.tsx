import React from 'react';
import FeatureCard from './FeatureCard';
import { featureData } from './FeatureData';
import { RainbowButton } from '@/components/ui/rainbow-button';

const Features: React.FC = () => {
  return (
    <section className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Kickstart your marketing</h2>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aliquam doloribus
            nesciunt eos fugiat. Vitae aperiam fugit consequuntur saepe laborum.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <RainbowButton>
            Get Started Today
          </RainbowButton>
        </div>
      </div>
    </section>
  );
};

export default Features;