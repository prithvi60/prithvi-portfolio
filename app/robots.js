export default function robots() {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: "/private/",
      },
      {
        userAgent: "Applebot",
        disallow: ["/"],
      },
    ],
    sitemap: "https://prithvi.webibee.com/sitemap.xml",
  };
}
