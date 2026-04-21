import AboutUs from "@/components/about-us";
import { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

export const metadata = {
  title: "Politica de cookie",
  description:
    "Politica de utilizare a fisierelor cookie pe FirmeAmenajariGradina.ro.",
  openGraph: {
    title: "Politica de cookie",
    description:
      "Politica de utilizare a fisierelor cookie pe FirmeAmenajariGradina.ro.",
    url: "/politica-cookie",
  },
  alternates: {
    canonical: "/politica-cookie",
  },
};

const index = () => {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Politica de cookie", path: "/politica-cookie" },
        ]}
      />
      <AboutUs />
    </>
  );
};

export default index;
