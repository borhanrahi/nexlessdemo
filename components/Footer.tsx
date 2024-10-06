import Link from 'next/link';
import { Apple, PlayCircle, Send ,  } from 'lucide-react';
import { DiscordLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <section className="py-8 md:py-16 lg:py-32">
      <div className="container mx-auto px-4">
        <footer>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Link href="/" className="text-2xl font-bold mb-8 mr-auto md:mb-0">Logo</Link>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <p className="text-sm md:text-lg font-medium">Copy the code and make it yours.</p>
              <div className="flex gap-2">
                <Link href="#" className="inline-flex rounded-lg bg-zinc-900 p-2 md:p-2.5 justify-center items-center">
                  <Apple className="size-5 md:size-7 text-background dark:text-white" />
                </Link>
                <Link href="#" className="inline-flex rounded-lg bg-zinc-900 p-2 md:p-2.5 justify-center items-center">
                  <PlayCircle className="size-5 md:size-6 text-background dark:text-white" />
                </Link>
              </div>
            </div>
          </div>
          <div className="shrink-0 bg-border h-[1px] w-full my-8 md:my-14"></div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 font-bold">Product</h3>
              <ul className="space-y-4">
                {['Overview', 'Pricing', 'Marketplace', 'Features', 'Integrations'].map((item) => (
                  <li key={item} className="font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                    <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-4">
                {['About', 'Team', 'Blog', 'Careers', 'Contact', 'Privacy'].map((item) => (
                  <li key={item} className="font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                    <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Resources</h3>
              <ul className="space-y-4">
                {['Help', 'Sales', 'Advertise'].map((item) => (
                  <li key={item} className="font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                    <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Legal</h3>
              <ul className="space-y-4">
                <li className="font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  <Link href="/terms">Term of Services</Link>
                </li>
                <li className="font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
              <h3 className="mb-4 mt-8 font-bold">Social</h3>
              <ul className="flex space-x-6 text-zinc-600 items-center">
                <li className="font-medium hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  <Link href="#"><DiscordLogoIcon className="size-6" /></Link>
                </li>
                <li className="font-medium hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  <Link href="#"><TwitterLogoIcon className="size-6" /></Link>
                </li>
                <li className="font-medium hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  <Link href="#"><Send className="size-6" /></Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="shrink-0 bg-border h-[1px] w-full my-8 md:my-14"></div>
          <p className="text-xs md:text-sm text-zinc-600 dark:text-gray-300">
            © {new Date().getFullYear()} <Link href="https://github.com/borhanrahi" target="_blank" rel="noopener noreferrer" className="hover:underline">Borhan</Link>. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}