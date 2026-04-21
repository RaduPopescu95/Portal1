import AboutUs from "@/components/about-us";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

export const metadata = {
  title: "Despre noi",
  description:
    "Afla mai multe despre FirmeAmenajariGradina.ro – directorul national de firme de amenajari gradini si spatii verzi.",
  openGraph: {
    title: "Despre noi",
    description:
      "Afla mai multe despre FirmeAmenajariGradina.ro – directorul national de firme de amenajari gradini si spatii verzi.",
    url: "/despre-noi",
  },
  alternates: {
    canonical: "/despre-noi",
  },
};

const index = () => {
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

      <AboutUs />
    </>
  );
};

export default index;
