import { parseDateToISO } from "./timeUtils";
import { replaceSpacesWithDashes } from "./strintText";
import { slugifyFirma } from "./slugify";
import { canonicalUrl } from "./siteUrl";

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

function slugify(str) {
  if (!str) return "";
  return replaceSpacesWithDashes(String(str)).toLowerCase();
}

function buildPlace(name) {
  if (!isNonEmpty(name)) return null;
  return {
    "@type": "Place",
    name,
  };
}

function buildFaqItems(faq) {
  if (!Array.isArray(faq)) return [];
  return faq
    .filter((item) => isNonEmpty(item?.question) && isNonEmpty(item?.answer))
    .map((item) => ({
      "@type": "Question",
      name: String(item.question).trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: String(item.answer).trim(),
      },
    }));
}

function validTime(value) {
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function buildOpeningHoursSpecification(openingHours) {
  if (!Array.isArray(openingHours)) return [];

  return openingHours
    .filter(
      (item) =>
        isNonEmpty(item?.dayOfWeek) &&
        validTime(item?.opens) &&
        validTime(item?.closes)
    )
    .map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.dayOfWeek,
      opens: item.opens,
      closes: item.closes,
    }));
}

function buildAggregateRating(rating) {
  const ratingValue = Number(rating?.ratingValue);
  const reviewCount = Number(rating?.reviewCount);

  if (
    Number.isNaN(ratingValue) ||
    Number.isNaN(reviewCount) ||
    ratingValue < 1 ||
    ratingValue > 5 ||
    reviewCount < 1
  ) {
    return null;
  }

  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
  };
}

export function buildOrganizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FirmeAmenajariGradina.ro",
    url: canonicalUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: canonicalUrl("/android-chrome-512x512.png"),
    },
  };
}

export function buildFaqPageLd(faq, pagePath) {
  const mainEntity = buildFaqItems(faq);
  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: canonicalUrl(pagePath),
    mainEntity,
  };
}

export function buildWebPageLd({ name, description, path }) {
  return pick({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: canonicalUrl(path),
  });
}

export function buildLocalBusinessLd(firma, _siteUrl, pagePath) {
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

  const areaServed = [buildPlace(firma.localitate), buildPlace(firma.judet)].filter(
    Boolean
  );

  const makesOffer = firma.categorie
    ? {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: firma.categorie,
          serviceType: firma.categorie,
        },
      }
    : null;

  const hasMap = geo
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${geo.latitude},${geo.longitude}`
      )}`
    : null;
  const openingHoursSpecification = buildOpeningHoursSpecification(
    firma.structuredData?.openingHours
  );
  const aggregateRating = buildAggregateRating(
    firma.structuredData?.aggregateRating
  );

  return pick({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: firma.siteName,
    description: firma.metaDescription,
    url: canonicalUrl(pagePath),
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
    hasMap: hasMap || undefined,
    priceRange: firma.structuredData?.priceRange,
    openingHoursSpecification: openingHoursSpecification.length
      ? openingHoursSpecification
      : undefined,
    areaServed: areaServed.length ? areaServed : undefined,
    serviceType: firma.categorie,
    makesOffer: makesOffer || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    aggregateRating: aggregateRating || undefined,
  });
}

export function buildItemListLd(firme, _siteUrl) {
  if (!Array.isArray(firme) || firme.length === 0) return null;

  const items = firme
    .map((f, i) => {
      const slug = f?.slug || slugifyFirma(f);
      if (!slug) return null;
      const path = `/firma/${slug}`;
      return pick({
        "@type": "ListItem",
        position: i + 1,
        url: canonicalUrl(path),
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

export function buildBreadcrumbListLd(crumbs, _siteUrl) {
  if (!Array.isArray(crumbs) || crumbs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}

export function buildArticleLd(article, _siteUrl, pagePath) {
  if (!article) return null;

  const url = canonicalUrl(pagePath);
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
        url: canonicalUrl("/android-chrome-512x512.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  });
}
