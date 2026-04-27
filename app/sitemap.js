import {
  getArticles,
  getCounties,
  getLocalLandingPageSlugs,
  getPublishedCompanies,
  getSiteSettings,
  getStaticPages,
} from "@/lib/sanity/queries";
import { canonicalUrl } from "@/utils/siteUrl";

export const revalidate = 3600;

const STATIC_PUBLIC_ROUTES = [
  "/",
  "/amenajari-gradini",
  "/cauta",
  "/blog",
  "/contact",
  "/cum-functioneaza",
  "/despre-noi",
  "/inscrie-firma",
  "/politica-confidentialitate",
  "/politica-cookie",
  "/service",
  "/terms",
];

function isIndexable(item) {
  return item?.seo?.noIndex !== true;
}

function hasSlug(item, slugKey = "slug") {
  return Boolean(item?.[slugKey]);
}

function lastModified(...dates) {
  for (const date of dates) {
    if (!date) continue;
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return undefined;
}

function entry(path, lastModifiedDate, imageUrl) {
  const item = {
    url: canonicalUrl(path),
  };
  if (lastModifiedDate) item.lastModified = lastModifiedDate;
  if (imageUrl) item.image = { url: imageUrl };
  return item;
}

function dedupeEntries(entries) {
  const byUrl = new Map();

  for (const item of entries) {
    const existing = byUrl.get(item.url);
    if (!existing || (!existing.lastModified && item.lastModified)) {
      byUrl.set(item.url, item);
    }
  }

  return Array.from(byUrl.values());
}

export default async function sitemap() {
  const [companies, counties, landingPages, articles, staticPages, settings] =
    await Promise.all([
      getPublishedCompanies({ limit: 10000 }),
      getCounties(),
      getLocalLandingPageSlugs(),
      getArticles({ limit: 10000 }),
      getStaticPages(),
      getSiteSettings(),
    ]);
  const staticPagesBySlug = new Map(
    staticPages.filter((page) => hasSlug(page)).map((page) => [page.slug, page])
  );
  const staticRouteEntries = STATIC_PUBLIC_ROUTES.flatMap((path) => {
    const slug = path === "/" ? null : path.slice(1);
    const sanityPage = slug ? staticPagesBySlug.get(slug) : null;

    if (sanityPage?.seo?.noIndex) return [];

    return [
      entry(path, lastModified(sanityPage?._updatedAt, settings?._updatedAt)),
    ];
  });

  return dedupeEntries([
    ...staticRouteEntries,
    ...staticPages
      .filter((page) => hasSlug(page) && isIndexable(page))
      .map((page) => entry(`/${page.slug}`, lastModified(page._updatedAt))),
    ...counties
      .filter((county) => hasSlug(county) && isIndexable(county))
      .map((county) =>
        entry(`/judet/${county.slug}`, lastModified(county._updatedAt))
      ),
    ...landingPages
      .filter((page) => hasSlug(page, "clinici") && isIndexable(page))
      .map((page) => entry(`/${page.clinici}`, lastModified(page._updatedAt))),
    ...companies
      .filter((company) => hasSlug(company) && isIndexable(company))
      .map((company) =>
        entry(
          `/firma/${company.slug}`,
          lastModified(company._updatedAt),
          company?.imagini?.imgs?.[0]?.finalUri
        )
      ),
    ...articles
      .filter((article) => hasSlug(article) && isIndexable(article))
      .map((article) =>
        entry(
          `/blog/${article.slug}`,
          lastModified(article.publishedAt, article._updatedAt),
          article?.image?.finalUri
        )
      ),
  ]);
}
