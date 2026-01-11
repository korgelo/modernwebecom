import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "SuyoohTech | Latest Gadget Reviews",
  description:
    "SuyoohTech Blog provides honest, data-driven electronics reviews, computer buying guides, and the latest gadget comparisons for American consumers.",

  alternates: {
    canonical: "https://www.suyooh.com",
  },

  icons: {
    icon: "/assets/suyooh-logo.jpg",
    shortcut: "/assets/suyooh-logo.jpg",
    apple: "/assets/suyooh-logo.jpg",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "SuyoohTech | Latest Gadget Reviews",
    description: "Honest gadget reviews, buying guides, and tech comparisons.",
    url: "https://www.suyooh.com",
    siteName: "SuyoohTech",
    images: [
      {
        url: "/assets/suyooh-logo.jpg",
        width: 1200,
        height: 630,
        alt: "SuyoohTech Logo",
      },
    ],
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-9465532368889991",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DGSWKW46V7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DGSWKW46V7');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NC9JL5T2');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9465532368889991"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Ads / gtag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-922060105"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-922060105');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-slate-50 text-slate-900`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NC9JL5T2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div className="min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
