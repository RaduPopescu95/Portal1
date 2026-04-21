import Wrapper from "@/components/layout/Wrapper";
import HomeMain from "./(homes)/home-page/page";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const metadata = {
  title: "Amenajari Gradini si Spatii Verzi – Peisagisti Romania",
  description:
    "Cauti o firma de amenajari gradini pentru casa ta sau pentru sediul companiei? Gaseste specialistii in amenajari spatii verzi din apropierea ta.",
  openGraph: {
    title: "Amenajari Gradini si Spatii Verzi – Peisagisti Romania",
    description:
      "Cauti o firma de amenajari gradini pentru casa ta sau pentru sediul companiei? Gaseste specialistii in amenajari spatii verzi din apropierea ta.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};
export const revalidate = 60; // revalidate at most every minute , hour at 3600

export default async function Home() {
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FirmeAmenajariGradina.ro",
    url: SITE_URL,
    description:
      "Director national cu firme de amenajari gradini, peisagisti si servicii de intretinere spatii verzi.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/cauta?slug={search_term_string}`,
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
