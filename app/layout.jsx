import { EB_Garamond, Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";


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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${sourceCodePro.variable} ${ebGaramond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
