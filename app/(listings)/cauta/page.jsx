import SliderStyle from "@/components/listing-style/slider-style";
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
  title: "Cauta firme de amenajari spatii verzi",
  description:
    "Cauta un furnizor de servicii de amenajari spatii verzi in apropiere si solicita o oferta personalizata.",
  openGraph: {
    title: "Cauta firme de amenajari spatii verzi",
    description:
      "Cauta un furnizor de servicii de amenajari spatii verzi in apropiere si solicita o oferta personalizata.",
    url: canonicalUrl("/cauta"),
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: canonicalUrl("/cauta"),
  },
};

export const revalidate = 60; // revalidate at most every minute , hour at 3600

export async function getServerData(params) {
  try {
    const [judete, categorii, localitati, firme] = await Promise.all([
      getCounties(),
      getServiceCategories(),
      getCities(),
      getPublishedCompanies({ limit: 200 }),
    ]);
    return { judete, categorii, localitati, firme };
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return { judete: [], categorii: [], localitati: [], firme: [] };
  }
}

const index = async ({ params }) => {
  const data = await getServerData(params);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cauta firme de amenajari spatii verzi",
    description:
      "Cauta un furnizor de servicii de amenajari spatii verzi in apropiere si solicita o oferta personalizata.",
    url: canonicalUrl("/cauta"),
  };

  const itemListLd = buildItemListLd(data.firme);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Cauta", path: "/cauta" },
        ]}
      />

      <SliderStyle
        params={params.clinici}
        judete={data.judete}
        categorii={data.categorii}
        localitati={data.localitati}
        firme={data.firme}
        renderMode="listing"
        h1Title="Cauta firme de amenajari gradini si spatii verzi"
      />
    </>
  );
};

export default index;
