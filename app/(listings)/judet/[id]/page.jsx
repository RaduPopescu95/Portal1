import Judete from "../../../../components/judete";
import {
  getCitiesByCountySlug,
  getCompaniesByCountySlug,
  getCountyBySlug,
  getCountySlugs,
} from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import { filtrareOferte } from "@/utils/commonUtils";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildFaqPageLd, buildItemListLd } from "@/utils/schemaOrg";
import { canonicalUrl } from "@/utils/siteUrl";
import { DEFAULT_OG_IMAGE } from "@/utils/seoDefaults";

export const revalidate = 60; // revalidate at most every minute , hour at 3600

export async function generateStaticParams() {
  return await getCountySlugs();
}

export async function generateMetadata({ params }) {
  const county = await getCountyBySlug(params.id);
  const judetParam = county?.name || params.id;
  const title = `Specialisti in peisagistica si gradinarit ${judetParam}`;
  const description =
    county?.seo?.metaDescription ||
    `Firme serioase de amenajari gradini si spatii verzi din judetul ${judetParam}. Vezi peisagistii recomandati si cere oferta acum.`;
  const canonical = canonicalUrl(county?.seo?.canonical || `/judet/${params.id}`);
  return {
    title: county?.seo?.metaTitle || title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical,
    },
    robots: county?.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export async function getServerData(params, searchParams) {
  try {
    const [county, localitati, firms] = await Promise.all([
      getCountyBySlug(params.id),
      getCitiesByCountySlug(params.id),
      getCompaniesByCountySlug(params.id),
    ]);
    let firmeFinal = firms;
    if (searchParams) {
      firmeFinal = await filtrareOferte(firms, searchParams);
    }

    return { county, localitati, firms: firmeFinal };
  } catch (error) {
    console.error("Failed to fetch data....:", error);
    return { county: null, localitati: [], firms: [] };
  }
}

const index = async ({ params, searchParams }) => {
  if (params.id === "favicon.ico") {
    return null;
  }

  const data = await getServerData(params, searchParams.slug);

  if (!data.county) {
    notFound();
  }

  const judetParam = data.county.name;
  const h1Title = `Firme de amenajari gradini si spatii verzi in ${judetParam}`;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Specialisti in peisagistica si gradinarit ${judetParam}`,
    description: `Firme serioase de amenajari gradini si spatii verzi din judetul ${judetParam}.`,
    url: canonicalUrl(`/judet/${params.id}`),
  };

  const itemListLd = buildItemListLd(data.firms);
  const faqPageLd = buildFaqPageLd(data.county.faq, `/judet/${params.id}`);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <JsonLd data={faqPageLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Judete", path: "/amenajari-gradini" },
          { name: judetParam, path: `/judet/${params.id}` },
        ]}
      />

      <Judete
        data={data}
        judet={judetParam}
        h1Title={h1Title}
        params={params}
        searchParams={searchParams.slug}
      />
    </>
  );
};

export default index;
