import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Testing Jest',
  description: 'Testing Jest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <header className="bg-gray-100 p-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Testing Jest
          </h1>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-100 p-4">
          <p className="text-sm text-gray-500 text-center">
            © 2025 Testing Jest
          </p>
        </footer>
      </body>
    </html>
  );
}
