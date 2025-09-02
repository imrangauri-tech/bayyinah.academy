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
  <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TTXQGS8H');
            `,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Analytics (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5T6RTQDNP1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5T6RTQDNP1');
            `,
          }}
        />
        {/* End Google Analytics */}

        {/* Google Ads (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17513919644"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17513919644');
            `,
          }}
        />
        {/* End Google Ads */}
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TTXQGS8H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <MainHeader />
        <main>{children}</main>
        <JoiningGuide />
        <Footer />
      </body>
    </html>
  );
}
