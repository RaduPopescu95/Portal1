import AboutUs from "@/components/about-us";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import StaticPageContent from "@/components/sanity/StaticPageContent";
import { getStaticPageBySlug } from "@/lib/sanity/queries";
import { getStaticPageMetadata } from "@/lib/sanity/staticPage";

const fallbackMetadata = {
  title: "Cum functioneaza portalul",
  description:
    "Afla cum gasesti rapid o firma de amenajari gradini pe FirmeAmenajariGradina.ro si cum soliciti o oferta personalizata.",
};

export async function generateMetadata() {
  return getStaticPageMetadata("cum-functioneaza", fallbackMetadata);
}

const index = async () => {
  const page = await getStaticPageBySlug("cum-functioneaza");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cum functioneaza portalul",
    description:
      "Afla cum gasesti rapid o firma de amenajari gradini pe FirmeAmenajariGradina.ro si cum soliciti o oferta personalizata.",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Cum functioneaza", path: "/cum-functioneaza" },
        ]}
      />

      {page ? <StaticPageContent page={page} /> : <AboutUs />}
    </>
  );
};

export default index;
