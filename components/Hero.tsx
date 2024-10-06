import Link from 'next/link';
import { ExternalLink, Code2, Palette, Zap, Grid as GridIcon, CircleUserRound } from 'lucide-react';
import BlurIn from '@/components/ui/blur-in';
import RetroGrid from '@/components/ui/retro-grid';
import ShimmerButton from '@/components/ui/shimmer-button';
import ShinyButton from '@/components/ui/shiny-button';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <RetroGrid className="absolute inset-0" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
            <CircleUserRound className="h-16 w-16 text-zinc-800 dark:text-zinc-200" />
            <BlurIn
              word="Build your next project with Blocks"
              className="mb-6 text-pretty text-2xl font-bold lg:text-5xl"
              duration={1.2}
            />
            <p className="text-zinc-600 dark:text-zinc-400 lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro
              facilis quo animi consequatur. Explicabo.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <ShimmerButton
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-white hover:bg-zinc-900/90 dark:bg-white dark:text-zinc-900 dark:hover:bg-white/90 h-10 px-4 py-2"
                type="button">
                <span>Get Started</span>
              </ShimmerButton>
              <ShinyButton
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-zinc-100 hover:text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 h-10 px-5 py-2"
                >
                Learn more
                <ExternalLink className="ml-2 h-4 w-4" />
              </ShinyButton>
            </div>
            <div className="mt-20 flex flex-col items-center gap-4 w-full">
              <p className="text-center text-zinc-600 dark:text-zinc-400">Built with open-source technologies</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  { icon: Code2, name: 'TypeScript' },
                  { icon: Zap, name: 'React' },
                  { icon: Palette, name: 'Tailwind CSS' },
                  { icon: GridIcon, name: 'Next.js' }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white hover:bg-zinc-100 hover:text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 h-10 py-2 group px-3"
                  >
                    <item.icon className="h-6 w-6 transition-all group-hover:scale-110" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;