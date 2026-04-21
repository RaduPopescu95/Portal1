import Contact from "@/components/contact";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import StaticPageContent from "@/components/sanity/StaticPageContent";
import { getStaticPageBySlug } from "@/lib/sanity/queries";
import { getStaticPageMetadata } from "@/lib/sanity/staticPage";

const fallbackMetadata = {
  title: "Contact",
  description:
    "Contacteaza echipa FirmeAmenajariGradina.ro pentru intrebari, colaborari sau inscrierea unei firme de amenajari gradini in director.",
};

export async function generateMetadata() {
  return getStaticPageMetadata("contact", fallbackMetadata);
}

const index = async () => {
  const page = await getStaticPageBySlug("contact");
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

      {page && <StaticPageContent page={page} />}
      <Contact />
    </>
  );
};

export default index;
