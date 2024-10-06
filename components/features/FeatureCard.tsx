import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <a
    className="block rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10 bg-white dark:bg-zinc-900"
    href="#"
  >
    {icon}
    <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">{title}</h2>
    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
  </a>
);

export default FeatureCard;