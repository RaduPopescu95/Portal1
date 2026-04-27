import { canonicalUrl } from "@/utils/siteUrl";

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
    sitemap: canonicalUrl("/sitemap.xml"),
  };
}
