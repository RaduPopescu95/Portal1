import SliderStyle from "@/components/listing-style/slider-style";
import { filtrareOferte } from "@/utils/commonUtils";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildItemListLd } from "@/utils/schemaOrg";
import { canonicalUrl } from "@/utils/siteUrl";
import { DEFAULT_OG_IMAGE } from "@/utils/seoDefaults";
import {
  getCounties,
  getCities,
  getPublishedCompanies,
  getServiceCategories,
} from "@/lib/sanity/queries";

export const metadata = {
  title: "Firme de proiectare, amenajare si intretinere spatii verzi",
  description:
    "Cauti un partener de incredere pentru gradina ta rezidentiala sau comerciala? Vezi firmele de amenajari spatii verzi din toata Romania.",
  openGraph: {
    title: "Firme de proiectare, amenajare si intretinere spatii verzi",
    description:
      "Cauti un partener de incredere pentru gradina ta rezidentiala sau comerciala? Vezi firmele de amenajari spatii verzi din toata Romania.",
    url: canonicalUrl("/amenajari-gradini"),
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: canonicalUrl("/amenajari-gradini"),
  },
};

export const revalidate = 60; // revalidate at most every minute , hour at 3600

export async function getServerData(params, searchParams) {
  try {
    const [judete, categorii, localitati, firme] = await Promise.all([
      getCounties(),
      getServiceCategories(),
      getCities(),
      getPublishedCompanies({ limit: 200 }),
    ]);
    let firmeFinal = firme;
    if (searchParams) {
      firmeFinal = await filtrareOferte(firme, searchParams);
    }
    return { judete, categorii, localitati, firme: firmeFinal };
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return { judete: [], categorii: [], localitati: [], firme: [] };
  }
}

const index = async ({ params, searchParams }) => {
  const data = await getServerData(params, searchParams.slug);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Firme de proiectare, amenajare si intretinere spatii verzi",
    description:
      "Cauti un partener de incredere pentru gradina ta rezidentiala sau comerciala? Vezi firmele de amenajari spatii verzi din toata Romania.",
    url: canonicalUrl("/amenajari-gradini"),
  };

  const itemListLd = buildItemListLd(data.firme);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Amenajari gradini", path: "/amenajari-gradini" },
        ]}
      />

      <SliderStyle
        params={params.clinici}
        judete={data.judete}
        categorii={data.categorii}
        localitati={data.localitati}
        firme={data.firme}
        searchParams={searchParams.slug}
        renderMode="listing"
        h1Title="Firme de proiectare, amenajare si intretinere spatii verzi in Romania"
      />
    </>
  );
};

export default index;
