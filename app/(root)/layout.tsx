import '../globals.css'
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import StripeWrapper from '../layouts/StripeWrapper';
import { UserProvider } from '@/context/UserContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SaaS Boilerplate",
  description: "A comprehensive SaaS boilerplate built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UserProvider>
          <StripeWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <div className="flex flex-col min-h-screen">
                <Navbar/>
                <main className="flex-grow">{children}</main>
                <Footer/>
              </div>
            </ThemeProvider>
          </StripeWrapper>
        </UserProvider>
      </body>
    </html>
  );
}