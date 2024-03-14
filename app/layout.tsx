import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import NextAuthProvider from "@/components/shared/NextAuthProvider";
import { CounterStoreProvider } from "@/components/shared/Item-store-provider";

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
        <NextAuthProvider>
          <CounterStoreProvider>
            <Navbar />
            <div className="grow">{children}</div>
            <Footer />
          </CounterStoreProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
