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
import { buildItemListLd } from "@/utils/schemaOrg";

export const revalidate = 60; // revalidate at most every minute , hour at 3600

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

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
  return {
    title: county?.seo?.metaTitle || title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/judet/${params.id}`,
    },
    alternates: {
      canonical: county?.seo?.canonical || `${SITE_URL}/judet/${params.id}`,
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
    url: `${SITE_URL}/judet/${params.id}`,
  };

  const itemListLd = buildItemListLd(data.firms, SITE_URL);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
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
