import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Testing Jest",
  description: "Testing Jest"
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header className="px-4 sm:px-6 lg:px-8 xl:px-12 py-4" />
        <main className="flex-grow px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
          {children}
        </main>
        <Footer className="px-4 sm:px-6 lg:px-8 xl:px-12 py-4" />
      </body>
    </html>
  );
};

export default RootLayout;
