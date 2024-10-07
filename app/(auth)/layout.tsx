import { Inter } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from "next-themes";
import Navbar from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your App Name',
  description: 'Your app description',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}