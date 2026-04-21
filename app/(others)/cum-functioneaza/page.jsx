import AboutUs from "@/components/about-us";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

export const metadata = {
  title: "Cum functioneaza portalul",
  description:
    "Afla cum gasesti rapid o firma de amenajari gradini pe FirmeAmenajariGradina.ro si cum soliciti o oferta personalizata.",
  openGraph: {
    title: "Cum functioneaza portalul",
    description:
      "Afla cum gasesti rapid o firma de amenajari gradini pe FirmeAmenajariGradina.ro si cum soliciti o oferta personalizata.",
    url: "/cum-functioneaza",
  },
  alternates: {
    canonical: "/cum-functioneaza",
  },
};

const index = () => {
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

      <AboutUs />
    </>
  );
};

export default index;
