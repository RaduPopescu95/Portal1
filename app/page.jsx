import Wrapper from "@/components/layout/Wrapper";
import HomeMain from "./(homes)/home-page/page";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { canonicalUrl } from "@/utils/siteUrl";
import { DEFAULT_OG_IMAGE } from "@/utils/seoDefaults";

export const metadata = {
  title: "Amenajari Gradini si Spatii Verzi – Peisagisti Romania",
  description:
    "Cauti o firma de amenajari gradini pentru casa ta sau pentru sediul companiei? Gaseste specialistii in amenajari spatii verzi din apropierea ta.",
  openGraph: {
    title: "Amenajari Gradini si Spatii Verzi – Peisagisti Romania",
    description:
      "Cauti o firma de amenajari gradini pentru casa ta sau pentru sediul companiei? Gaseste specialistii in amenajari spatii verzi din apropierea ta.",
    url: canonicalUrl("/"),
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: canonicalUrl("/"),
  },
};
export const revalidate = 60; // revalidate at most every minute , hour at 3600

export default async function Home() {
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FirmeAmenajariGradina.ro",
    url: canonicalUrl("/"),
    description:
      "Director national cu firme de amenajari gradini, peisagisti si servicii de intretinere spatii verzi.",
    potentialAction: {
      "@type": "SearchAction",
      target: canonicalUrl("/cauta?slug={search_term_string}"),
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <BreadcrumbsJsonLd items={[{ name: "Acasa", path: "/" }]} />

      <Wrapper>
        <HomeMain />
      </Wrapper>
    </>
  );
}
