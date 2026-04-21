import Terms from "@/components/terms-conditions";
import { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

export const metadata = {
  title: "Termeni si conditii",
  description:
    "Termenii si conditiile de utilizare a portalului FirmeAmenajariGradina.ro.",
  openGraph: {
    title: "Termeni si conditii",
    description:
      "Termenii si conditiile de utilizare a portalului FirmeAmenajariGradina.ro.",
    url: "/terms",
  },
  alternates: {
    canonical: "/terms",
  },
};

const index = () => {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Termeni si conditii", path: "/terms" },
        ]}
      />
      <Terms />
    </>
  );
};

export default index;
