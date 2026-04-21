import {
  getArticles,
  getCounties,
  getLocalLandingPageSlugs,
  getPublishedCompanies,
  getStaticPages,
} from "@/lib/sanity/queries";

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

function entry(path, imageUrl) {
  const item = {
    url: `${SITE_URL}${path}`,
    lastModified: new Date().toISOString(),
  };
  if (imageUrl) item.image = { url: imageUrl };
  return item;
}

export default async function sitemap() {
  const [companies, counties, landingPages, articles, staticPages] =
    await Promise.all([
      getPublishedCompanies({ limit: 10000 }),
      getCounties(),
      getLocalLandingPageSlugs(),
      getArticles({ limit: 10000 }),
      getStaticPages(),
    ]);

  return [
    entry("/"),
    ...staticPages.map((page) => entry(`/${page.slug}`)),
    ...counties.map((county) => entry(`/judet/${county.slug}`)),
    ...landingPages.map((page) => entry(`/${page.clinici}`)),
    ...companies.map((company) =>
      entry(`/firma/${company.slug}`, company?.imagini?.imgs?.[0]?.finalUri)
    ),
    ...articles.map((article) =>
      entry(`/blog/${article.slug}`, article?.image?.finalUri)
    ),
  ];
}

