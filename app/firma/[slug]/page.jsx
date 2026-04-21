import SliderStyle from "@/components/listing-style/slider-style";
import { notFound } from "next/navigation";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildLocalBusinessLd } from "@/utils/schemaOrg";
import {
  getCompanyBySlug,
  getCompanySlugs,
  getCounties,
  getCities,
  getServiceCategories,
} from "@/lib/sanity/queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const revalidate = 60;

async function getFirmaBySlug(slug) {
  return getCompanyBySlug(slug);
}

export async function generateStaticParams() {
  try {
    return await getCompanySlugs();
  } catch (err) {
    console.error("generateStaticParams firma failed", err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const firma = await getFirmaBySlug(params.slug);
  const pagePath = `/firma/${params.slug}`;
  if (!firma) {
    return {
      title: "Firma negasita",
      alternates: { canonical: pagePath },
      robots: { index: false, follow: false },
    };
  }
  const title =
    firma.metaTitle ||
    `${firma.siteName} – firma amenajari gradini in ${firma.localitate || ""}`.trim();
  const description =
    firma.metaDescription ||
    "Vezi detalii, contact si servicii pe FirmeAmenajariGradina.ro.";
  const imageUrl = firma?.imagini?.imgs?.[0]?.finalUri;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pagePath,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    alternates: { canonical: pagePath },
  };
}

const Page = async ({ params }) => {
  const firma = await getFirmaBySlug(params.slug);
  if (!firma) {
    notFound();
  }

  const [judete, categorii, localitati] = await Promise.all([
    getCounties(),
    getServiceCategories(),
    getCities(),
  ]);

  const pagePath = `/firma/${params.slug}`;
  const localBusinessLd = buildLocalBusinessLd(firma, SITE_URL, pagePath);

  const breadcrumbs = [{ name: "Acasa", path: "/" }];
  if (firma?.judet) {
    breadcrumbs.push({
      name: firma.judet,
      path: `/judet/${firma.judet.toLowerCase().replace(/ /g, "-")}`,
    });
  }
  if (firma?.siteName) {
    breadcrumbs.push({ name: firma.siteName, path: pagePath });
  }

  return (
    <>
      <JsonLd data={localBusinessLd} />
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <SliderStyle
        params={params.slug}
        judete={judete}
        categorii={categorii}
        localitati={localitati}
        firme={[firma]}
        renderMode="detail"
        h1Title={firma.siteName}
      />
    </>
  );
};

export default Page;
