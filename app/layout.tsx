import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import NextAuthProvider from "@/components/shared/NextAuthProvider";
import { CounterStoreProvider } from "@/components/shared/Item-store-provider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Groceriess",
  description: "Grocey app for the next-generation!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className + " bg-gray-100"}>
        <NextTopLoader showSpinner={false} />
        <NextAuthProvider>
          <CounterStoreProvider>
            <Navbar />
            <div className="grow w-full lg:w-4/5 lg:mx-auto">{children}</div>
            <Footer />
            <Toaster />
          </CounterStoreProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
