"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sun, Moon, X, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { RainbowButton } from './ui/rainbow-button';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ? { name: session.user.email?.split('@')[0] || 'User', ...session.user } : null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="sticky top-0 z-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <nav aria-label="Main" className="relative z-10 flex max-w-max flex-1 items-center justify-center min-w-full">
          <div className="flex w-full items-center justify-between py-4">
            <div>
              <Link href="/" className="text-2xl font-bold">
                Logo
              </Link>
            </div>
            <div className="hidden lg:block">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link href="/platform" className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>
                    Platform
                  </Link>
                </li>
                <li>
                  <Link href="/use-cases" className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>
                    Use cases
                  </Link>
                </li>
                <li>
                  <Link href="/developers" className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>
                    Developers
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden items-center gap-4 lg:flex">
              {user ? (
                <>
                  <Link href="/account" className={`px-4 py-2 text-sm font-medium rounded-md ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Account
                  </Link>
                  <RainbowButton onClick={async () => {
                    await supabase.auth.signOut();
                    router.push('/');
                  }}>
                    Log out
                  </RainbowButton>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className={`px-4 py-2 text-sm font-medium rounded-md ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Log in
                  </Link>
                  <Link href="/sign-up">
                    <RainbowButton>
                      Sign up
                    </RainbowButton>
                  </Link>
                </>
              )}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-md ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                aria-label="Main Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed p- inset-y-0 right-0 z-30 w-4/5 bg-white dark:bg-gray-900 lg:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center p-4">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-full"
              >
                <X size={24} />
              </button>
              <nav className="flex flex-col space-y-6 items-center">
                <Link href="/platform" className={`text-xl font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>Platform</Link>
                <Link href="/use-cases" className={`text-xl font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>Use cases</Link>
                <Link href="/developers" className={`text-xl font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>Developers</Link>
                <Link href="/resources" className={`text-xl font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>Resources</Link>
                <Link href="/sign-in" className={`px-4 py-2 text-lg font-medium rounded-md ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                  Log in
                </Link>
                {user ? (
                  <>
                    <Link href="/account" className={`text-xl font-medium transition-colors ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>
                      Account
                    </Link>
                    <RainbowButton onClick={async () => {
                      await supabase.auth.signOut();
                      router.push('/');
                    }}>
                      Log out
                    </RainbowButton>
                  </>
                ) : (
                  <Link href="/sign-up">
                    <RainbowButton>
                      Sign up
                    </RainbowButton>
                  </Link>
                )}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}