import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import MainHeader from "@/globals/Header";
import JoiningGuide from "@/components/homepage/JoiningGuide";
import Footer from "@/globals/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? 'https://bayyinah-production.vercel.app' 
    : 'http://localhost:3000'
  ),
  title: "Bayyinah Academy",
  description:
    "Bayyinah Academy is an online learning platform that offers courses on Islamic studies, Arabic language, and more.",
  openGraph: {
    title: "Bayyinah Academy",
    description: "Bayyinah Academy is an online learning platform that offers courses on Islamic studies, Arabic language, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayyinah Academy",
    description: "Bayyinah Academy is an online learning platform that offers courses on Islamic studies, Arabic language, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <MainHeader />
        <main>{children}</main>
        <JoiningGuide />
        <Footer />
      </body>
    </html>
  );
}
