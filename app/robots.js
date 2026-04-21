// IMPORTANT: blocking intentionally until launch.
// To go live, change `disallow: "/"` to `allow: "/"` (or delete the `disallow` line).
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
