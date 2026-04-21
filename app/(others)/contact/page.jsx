import Contact from "@/components/contact";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

export const metadata = {
  title: "Contact",
  description:
    "Contacteaza echipa FirmeAmenajariGradina.ro pentru intrebari, colaborari sau inscrierea unei firme de amenajari gradini in director.",
  openGraph: {
    title: "Contact",
    description:
      "Contacteaza echipa FirmeAmenajariGradina.ro pentru intrebari, colaborari sau inscrierea unei firme de amenajari gradini in director.",
    url: "/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

const index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact – FirmeAmenajariGradina.ro",
    description:
      "Contacteaza echipa FirmeAmenajariGradina.ro pentru intrebari, colaborari sau inscrierea unei firme de amenajari gradini in director.",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Contact />
    </>
  );
};

export default index;
