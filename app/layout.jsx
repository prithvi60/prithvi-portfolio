import { EB_Garamond, Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Script from "next/script";


const inter = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-sourceCodePro",
  subsets: ["latin"],
  weight: ["400"]
});

const ebGaramond = EB_Garamond({
  variable: "--font-ebGaramond",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata = {
  title: "Have you met Prithvi ?",
  description: "Its my personal portfolio powered by AI",
  robots: "index, follow",
  applicationName: "Webibee Software Agency",
  authors: [{ name: "Prithvi" }],
  generator: "Next.js",
  keywords: [
    "Webibee",
    "Agency",
    "code",
    "web development",
    "javascript",
    "react",
    "node.js",
    "next.js",
    "Shopify",
    "html",
    "css",
    "Figma",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Prithvi, Gokul Gandhi",
  publisher: "Webibee Small Medium Enterprises",
  metadataBase: new URL("https://webibee.com/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    url: `https://prithvi.webibee.com`,
    title: "Have you met Prithvi ?",
    description:
      "Its my personal portfolio powered by AI",
    siteName: "Prithvi",
    images: [
      {
        url: "https://ik.imagekit.io/webibee/Webibee/Founder@webibee%20(2).png?updatedAt=1747146976053",
      },
    ],
  },
};

const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID || '';
const ahrefsKey = process.env.NEXT_PUBLIC_AHREFS_KEY || '';
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add Calendly widget stylesheet globally */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} ${sourceCodePro.variable} ${ebGaramond.variable} antialiased`}
      >
        {children}
        <Footer />

        {/* Hotjar Script */}
        {hotjarId && (
          <Script
            id="hotjar"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:"${hotjarId}",hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          />
        )}
        {/* Ahrefs Analytics Script */}
        {ahrefsKey && (
          <Script
            id="ahrefs-analytics"
            strategy="afterInteractive"
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={ahrefsKey}
            async
          />
        )}

        {/* Google Tag Manager (gtag.js) */}
        {gtmId && (
          <>
            <Script
              id="gtag"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
              async
            />
            <Script
              id="gtag-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gtmId}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
