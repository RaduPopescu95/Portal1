import AboutUs from "@/components/about-us";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import StaticPageContent from "@/components/sanity/StaticPageContent";
import { getStaticPageBySlug } from "@/lib/sanity/queries";
import { getStaticPageMetadata } from "@/lib/sanity/staticPage";

const fallbackMetadata = {
  title: "Despre noi",
  description:
    "Afla mai multe despre FirmeAmenajariGradina.ro – directorul national de firme de amenajari gradini si spatii verzi.",
};

export async function generateMetadata() {
  return getStaticPageMetadata("despre-noi", fallbackMetadata);
}

const index = async () => {
  const page = await getStaticPageBySlug("despre-noi");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Despre FirmeAmenajariGradina.ro",
    description:
      "Afla mai multe despre FirmeAmenajariGradina.ro – directorul national de firme de amenajari gradini si spatii verzi.",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Despre noi", path: "/despre-noi" },
        ]}
      />

      {page ? <StaticPageContent page={page} /> : <AboutUs />}
    </>
  );
};

export default index;
