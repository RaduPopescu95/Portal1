import { groq } from "next-sanity";
import { sanityFetch } from "./client";

const imageWithAltProjection = groq`{
  "finalUri": image.asset->url,
  "alt": alt,
  "caption": caption,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height
}`;

const seoProjection = groq`{
  metaTitle,
  metaDescription,
  canonical,
  noIndex,
  "socialImage": socialImage${imageWithAltProjection}
}`;

export const companyProjection = groq`{
  _id,
  _updatedAt,
  "documentId": _id,
  "siteName": name,
  name,
  "slug": slug.current,
  "stare": select(published == true => "Publicat", "Nepublicat"),
  "categorie": serviceCategory->name,
  "categorieSlug": serviceCategory->slug.current,
  "judet": county->name,
  "judetSlug": county->slug.current,
  "localitate": city->name,
  "localitateSlug": city->slug.current,
  "adresa": address,
  "codPostal": postalCode,
  "telefonUnu": phonePrimary,
  "telefonDoi": phoneSecondary,
  "emailUnu": emailPrimary,
  "emailDoi": emailSecondary,
  "websiteUnu": websitePrimary,
  "websiteDoi": websiteSecondary,
  facebook,
  "googlePlus": googleBusinessUrl,
  "logo": logo${imageWithAltProjection},
  "imagini": {
    "imgs": coalesce(gallery[]${imageWithAltProjection}, [])
  },
  "articleContentFirst": description,
  "articleContentSecond": null,
  shortDescription,
  "metaTitle": coalesce(seo.metaTitle, name),
  "metaDescription": coalesce(seo.metaDescription, shortDescription),
  structuredData,
  "coordonate": select(defined(coordinates) => {
    "lat": coordinates.lat,
    "lng": coordinates.lng
  }, null),
  "seo": seo${seoProjection}
}`;

const countyProjection = groq`{
  _id,
  _updatedAt,
  name,
  "siteName": name,
  "slug": slug.current,
  intro,
  content,
  faq,
  "seo": seo${seoProjection}
}`;

const cityProjection = groq`{
  _id,
  name,
  "siteName": name,
  "slug": slug.current,
  "judet": county->name,
  "countySlug": county->slug.current,
  shortDescription,
  seoPriority,
  "coordonate": select(defined(coordinates) => {
    "lat": coordinates.lat,
    "lng": coordinates.lng
  }, null)
}`;

const serviceCategoryProjection = groq`{
  _id,
  name,
  "siteName": name,
  "slug": slug.current,
  description,
  "icon": icon${imageWithAltProjection},
  "seo": seo${seoProjection}
}`;

const landingPageProjection = groq`{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  h1,
  intro,
  content,
  faq,
  internalLinks,
  "cityId": city->_id,
  "countyId": county->_id,
  "serviceCategoryId": serviceCategory->_id,
  "city": city->${cityProjection},
  "county": county->${countyProjection},
  "serviceCategory": serviceCategory->${serviceCategoryProjection},
  "featuredCompanies": featuredCompanies[]->${companyProjection},
  "seo": seo${seoProjection}
}`;

const articleProjection = groq`{
  _id,
  _updatedAt,
  title,
  "siteName": title,
  "slug": slug.current,
  publishedAt,
  "firstUploadDate": coalesce(string(publishedAt), string(_createdAt)),
  author,
  excerpt,
  content,
  faq,
  "image": image${imageWithAltProjection},
  "metaTitle": coalesce(seo.metaTitle, title),
  "metaDescription": coalesce(seo.metaDescription, excerpt),
  "seo": seo${seoProjection}
}`;

const staticPageProjection = groq`{
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  h1,
  intro,
  content,
  "seo": seo${seoProjection}
}`;

export async function getSiteSettings() {
  return sanityFetch({
    query: groq`*[_type == "siteSettings"][0]{
      _updatedAt,
      title,
      siteUrl,
      googleSiteVerification,
      "defaultSeo": defaultSeo${seoProjection}
    }`,
    fallback: null,
    tags: ["siteSettings"],
  });
}

export async function getServiceCategories() {
  return sanityFetch({
    query: groq`*[_type == "serviceCategory"] | order(name asc) ${serviceCategoryProjection}`,
    fallback: [],
    tags: ["serviceCategory"],
  });
}

export async function getCounties() {
  return sanityFetch({
    query: groq`*[_type == "county"] | order(name asc) ${countyProjection}`,
    fallback: [],
    tags: ["county"],
  });
}

export async function getCities() {
  return sanityFetch({
    query: groq`*[_type == "city"] | order(name asc) ${cityProjection}`,
    fallback: [],
    tags: ["city"],
  });
}

export async function getCitiesByCountySlug(countySlug) {
  return sanityFetch({
    query: groq`*[
      _type == "city" &&
      county->slug.current == $countySlug
    ] | order(name asc) ${cityProjection}`,
    params: { countySlug },
    fallback: [],
    tags: ["city", "county", `county:${countySlug}`],
  });
}

export async function getCompanyBySlug(slug) {
  return sanityFetch({
    query: groq`*[_type == "company" && published == true && slug.current == $slug][0] ${companyProjection}`,
    params: { slug },
    fallback: null,
    tags: ["company", `company:${slug}`],
  });
}

export async function getCompanySlugs() {
  return sanityFetch({
    query: groq`*[_type == "company" && published == true && defined(slug.current)]{"slug": slug.current}`,
    fallback: [],
    tags: ["company"],
    revalidate: 3600,
  });
}

export async function getPublishedCompanies({ limit = 200 } = {}) {
  return sanityFetch({
    query: groq`*[_type == "company" && published == true] | order(name asc) [0...$limit] ${companyProjection}`,
    params: { limit },
    fallback: [],
    tags: ["company"],
  });
}

export async function getCompaniesByCountySlug(countySlug) {
  return sanityFetch({
    query: groq`*[
      _type == "company" &&
      published == true &&
      county->slug.current == $countySlug
    ] | order(name asc) ${companyProjection}`,
    params: { countySlug },
    fallback: [],
    tags: ["company", "county", `county:${countySlug}`],
  });
}

export async function getCountyBySlug(slug) {
  return sanityFetch({
    query: groq`*[_type == "county" && slug.current == $slug][0] ${countyProjection}`,
    params: { slug },
    fallback: null,
    tags: ["county", `county:${slug}`],
  });
}

export async function getCountySlugs() {
  return sanityFetch({
    query: groq`*[_type == "county" && defined(slug.current)]{"id": slug.current}`,
    fallback: [],
    tags: ["county"],
    revalidate: 3600,
  });
}

export async function getLocalLandingPageBySlug(slug) {
  return sanityFetch({
    query: groq`*[
      _type == "localLandingPage" &&
      published == true &&
      slug.current == $slug
    ][0] ${landingPageProjection}`,
    params: { slug },
    fallback: null,
    tags: ["localLandingPage", `localLandingPage:${slug}`],
  });
}

export async function getLocalLandingPageSlugs() {
  return sanityFetch({
    query: groq`*[
      _type == "localLandingPage" &&
      published == true &&
      defined(slug.current)
    ]{
      "clinici": slug.current,
      _updatedAt,
      "seo": seo${seoProjection}
    }`,
    fallback: [],
    tags: ["localLandingPage"],
    revalidate: 3600,
  });
}

export async function getCompaniesForLandingPage(page) {
  if (!page) return [];
  if (Array.isArray(page.featuredCompanies) && page.featuredCompanies.length) {
    return page.featuredCompanies;
  }

  return sanityFetch({
    query: groq`*[
      _type == "company" &&
      published == true &&
      (!defined($cityId) || city._ref == $cityId) &&
      (!defined($countyId) || county._ref == $countyId) &&
      (!defined($serviceCategoryId) || serviceCategory._ref == $serviceCategoryId || $serviceCategoryId in services[]._ref)
    ] | order(name asc) ${companyProjection}`,
    params: {
      cityId: page.cityId || null,
      countyId: page.countyId || null,
      serviceCategoryId: page.serviceCategoryId || null,
    },
    fallback: [],
    tags: ["company", "localLandingPage"],
  });
}

export async function getArticles({ limit = 100 } = {}) {
  return sanityFetch({
    query: groq`*[
      _type == "article" &&
      published == true &&
      defined(slug.current)
    ] | order(coalesce(publishedAt, _createdAt) desc) [0...$limit] ${articleProjection}`,
    params: { limit },
    fallback: [],
    tags: ["article"],
  });
}

export async function getArticleBySlug(slug) {
  return sanityFetch({
    query: groq`*[
      _type == "article" &&
      published == true &&
      slug.current == $slug
    ][0] ${articleProjection}`,
    params: { slug },
    fallback: null,
    tags: ["article", `article:${slug}`],
  });
}

export async function getArticleSlugs() {
  return sanityFetch({
    query: groq`*[
      _type == "article" &&
      published == true &&
      defined(slug.current)
    ]{"id": slug.current}`,
    fallback: [],
    tags: ["article"],
    revalidate: 3600,
  });
}

export async function getStaticPageBySlug(slug) {
  return sanityFetch({
    query: groq`*[
      _type == "staticPage" &&
      published == true &&
      slug.current == $slug
    ][0] ${staticPageProjection}`,
    params: { slug },
    fallback: null,
    tags: ["staticPage", `staticPage:${slug}`],
  });
}

export async function getStaticPages() {
  return sanityFetch({
    query: groq`*[
      _type == "staticPage" &&
      published == true &&
      defined(slug.current)
    ] ${staticPageProjection}`,
    fallback: [],
    tags: ["staticPage"],
    revalidate: 3600,
  });
}
