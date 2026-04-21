import AboutUs from "@/components/about-us";
import { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

export const metadata = {
  title: "Politica de confidentialitate",
  description:
    "Cum prelucram datele utilizatorilor portalului FirmeAmenajariGradina.ro.",
  openGraph: {
    title: "Politica de confidentialitate",
    description:
      "Cum prelucram datele utilizatorilor portalului FirmeAmenajariGradina.ro.",
    url: "/politica-confidentialitate",
  },
  alternates: {
    canonical: "/politica-confidentialitate",
  },
};

const index = () => {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          {
            name: "Politica de confidentialitate",
            path: "/politica-confidentialitate",
          },
        ]}
      />
      <AboutUs />
    </>
  );
};

export default index;
