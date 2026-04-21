import InscrieClinica from "@/components/inscrie-firma";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

export const metadata = {
  title: "Inscrie-ti firma in director",
  description:
    "Inscrie-ti firma de amenajari gradini in cel mai mare director din Romania si atrage clienti locali.",
  openGraph: {
    title: "Inscrie-ti firma in director",
    description:
      "Inscrie-ti firma de amenajari gradini in cel mai mare director din Romania si atrage clienti locali.",
    url: "/inscrie-firma",
  },
  alternates: {
    canonical: "/inscrie-firma",
  },
};

const index = () => {
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
      <InscrieClinica />
    </>
  );
};

export default index;
