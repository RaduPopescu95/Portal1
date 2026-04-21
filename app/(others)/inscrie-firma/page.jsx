import InscrieClinica from "@/components/inscrie-firma";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import StaticPageContent from "@/components/sanity/StaticPageContent";
import { getStaticPageBySlug } from "@/lib/sanity/queries";
import { getStaticPageMetadata } from "@/lib/sanity/staticPage";

const fallbackMetadata = {
  title: "Inscrie-ti firma in director",
  description:
    "Inscrie-ti firma de amenajari gradini in cel mai mare director din Romania si atrage clienti locali.",
};

export async function generateMetadata() {
  return getStaticPageMetadata("inscrie-firma", fallbackMetadata);
}

const index = async () => {
  const page = await getStaticPageBySlug("inscrie-firma");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Inscrie-ti firma in director",
    description:
      "Inscrie-ti firma de amenajari gradini in cel mai mare director din Romania si atrage clienti locali.",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Inscrie firma", path: "/inscrie-firma" },
        ]}
      />
      {page && <StaticPageContent page={page} />}
      <InscrieClinica />
    </>
  );
};

export default index;
