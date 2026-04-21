import SliderStyle from "@/components/listing-style/slider-style";
import {
  getCompaniesForLandingPage,
  getCounties,
  getCities,
  getLocalLandingPageBySlug,
  getLocalLandingPageSlugs,
  getServiceCategories,
} from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildItemListLd } from "@/utils/schemaOrg";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const revalidate = 60;

export async function generateStaticParams() {
  return await getLocalLandingPageSlugs();
}

export async function generateMetadata({ params }) {
  const page = await getLocalLandingPageBySlug(params.clinici);
  const title = page?.seo?.metaTitle || page?.h1 || page?.title || "Pagina locala";
  const description =
    page?.seo?.metaDescription ||
    page?.intro ||
    "Firme locale de amenajari gradini si spatii verzi.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${params.clinici}`,
    },
    alternates: {
      canonical: page?.seo?.canonical || `/${params.clinici}`,
    },
    robots: page?.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

async function getServerData(params, searchParams) {
  try {
    const page = await getLocalLandingPageBySlug(params.clinici);
    const [judete, categorii, localitati, firme] = await Promise.all([
      getCounties(),
      getServiceCategories(),
      getCities(),
      getCompaniesForLandingPage(page),
    ]);
    return { judete, categorii, localitati, firme, page };
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return { judete: [], categorii: [], localitati: [], firme: [], page: null };
  }
}

const index = async ({ params, searchParams = null }) => {
  const data = await getServerData(params);
  if (!data.page) {
    notFound();
  }

  const pagePath = `/${params.clinici}`;
  const h1Title = data.page.h1 || data.page.title;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: h1Title,
    url: `${SITE_URL}${pagePath}`,
    description:
      data.page?.seo?.metaDescription ||
      data.page?.intro ||
      "Lista firmelor locale listate pe FirmeAmenajariGradina.ro.",
  };

  const itemListLd = buildItemListLd(data.firme, SITE_URL);

  const breadcrumbs = [{ name: "Acasa", path: "/" }];
  if (data.page?.county?.name) {
    breadcrumbs.push({
      name: data.page.county.name,
      path: `/judet/${data.page.county.slug}`,
    });
  }
  breadcrumbs.push({ name: h1Title, path: pagePath });

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <SliderStyle
        params={params.clinici}
        judete={data.judete}
        categorii={data.categorii}
        localitati={data.localitati}
        firme={data.firme}
        renderMode="listing"
        h1Title={h1Title}
        landingPage={data.page}
      />
    </>
  );
};

export default index;
