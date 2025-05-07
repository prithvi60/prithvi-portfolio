import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Personal Business Portfolio",
  description: "Webibee, led by Prithvi, is a dynamic digital solutions company specializing in web development, branding, and business growth strategies. The company focuses on creating custom websites, enhancing online presence, and driving digital transformation for startups and enterprises. With a strong emphasis on innovation, client-centric solutions, and measurable results, Webibee combines technical expertise with creative vision to deliver scalable and impactful projects. Services include web design, digital marketing, and business consultancy, ensuring tailored support for every client’s unique needs.",
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
    url: `https://webibee.com`,
    title: "Webibee Software Agency",
    description:
      "Business Tech for Small Medium Enterprises across the globe",
    siteName: "Webibee Agency",
    images: [
      {
        url: "https://ik.imagekit.io/webibee/Webibee/webibeepurplelogo.png?updatedAt=1735897013322",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
