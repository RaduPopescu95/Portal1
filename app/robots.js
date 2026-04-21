const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio",
          "/studio/",
          "/dashboard",
          "/adauga-",
          "/lista-",
          "/mesaje",
          "/setari",
          "/signin",
          "/inscrieri",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

