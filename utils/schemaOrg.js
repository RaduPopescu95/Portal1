import { parseDateToISO } from "./timeUtils";
import { replaceSpacesWithDashes } from "./strintText";
import { slugifyFirma } from "./slugify";

function isNonEmpty(v) {
  if (v == null) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "object") return Object.keys(v).length > 0;
  return true;
}

function pick(obj) {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (isNonEmpty(v)) result[k] = v;
  }
  return result;
}

function absoluteUrl(siteUrl, path) {
  if (!path) return siteUrl;
  if (path.startsWith("http")) return path;
  return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function slugify(str) {
  if (!str) return "";
  return replaceSpacesWithDashes(String(str)).toLowerCase();
}

export function buildLocalBusinessLd(firma, siteUrl, pagePath) {
  if (!firma) return null;

  const telephones = [firma.telefonUnu, firma.telefonDoi].filter(isNonEmpty);
  const sameAs = [
    firma.facebook,
    firma.websiteUnu,
    firma.websiteDoi,
    firma.googlePlus,
  ].filter(isNonEmpty);

  const imageEntries = (firma.imagini?.imgs || [])
    .filter((img) => isNonEmpty(img?.finalUri))
    .map((img) =>
      img.alt
        ? {
            "@type": "ImageObject",
            url: img.finalUri,
            caption: img.alt,
          }
        : img.finalUri
    );

  const address = pick({
    "@type": "PostalAddress",
    streetAddress: firma.adresa,
    addressLocality: firma.localitate,
    addressRegion: firma.judet,
    postalCode: firma.codPostal,
    addressCountry: "RO",
  });

  const geo =
    firma.coordonate?.lat && firma.coordonate?.lng
      ? {
          "@type": "GeoCoordinates",
          latitude: firma.coordonate.lat,
          longitude: firma.coordonate.lng,
        }
      : null;

  return pick({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: firma.siteName,
    description: firma.metaDescription,
    url: absoluteUrl(siteUrl, pagePath),
    image: imageEntries.length ? imageEntries : undefined,
    logo: firma.logo?.finalUri,
    telephone: telephones.length
      ? telephones.length === 1
        ? telephones[0]
        : telephones
      : undefined,
    email: firma.emailUnu,
    address: Object.keys(address).length > 1 ? address : undefined,
    geo: geo || undefined,
    areaServed: firma.localitate,
    sameAs: sameAs.length ? sameAs : undefined,
  });
}

export function buildItemListLd(firme, siteUrl) {
  if (!Array.isArray(firme) || firme.length === 0) return null;

  const items = firme
    .map((f, i) => {
      const slug = f?.slug || slugifyFirma(f);
      if (!slug) return null;
      const path = `/firma/${slug}`;
      return pick({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(siteUrl, path),
        name: f.siteName,
      });
    })
    .filter(Boolean);

  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items,
  };
}

export function buildBreadcrumbListLd(crumbs, siteUrl) {
  if (!Array.isArray(crumbs) || crumbs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(siteUrl, c.path),
    })),
  };
}

export function buildArticleLd(article, siteUrl, pagePath) {
  if (!article) return null;

  const url = absoluteUrl(siteUrl, pagePath);
  const datePublished = parseDateToISO(article.firstUploadDate);
  const dateModified = parseDateToISO(
    article.lastUpdateDate || article.firstUploadDate
  );

  return pick({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.metaTitle || article.siteName,
    description: article.metaDescription,
    image: article.image?.finalUri ? [article.image.finalUri] : undefined,
    datePublished: datePublished || undefined,
    dateModified: dateModified || undefined,
    author: {
      "@type": "Organization",
      name: "FirmeAmenajariGradina.ro",
    },
    publisher: {
      "@type": "Organization",
      name: "FirmeAmenajariGradina.ro",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteUrl, "/android-chrome-512x512.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  });
}
