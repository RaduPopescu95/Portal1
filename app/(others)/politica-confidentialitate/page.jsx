import AboutUs from "@/components/about-us";
import { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import StaticPageContent from "@/components/sanity/StaticPageContent";
import { getStaticPageBySlug } from "@/lib/sanity/queries";
import { getStaticPageMetadata } from "@/lib/sanity/staticPage";

const fallbackMetadata = {
  title: "Politica de confidentialitate",
  description:
    "Cum prelucram datele utilizatorilor portalului FirmeAmenajariGradina.ro.",
};

export async function generateMetadata() {
  return getStaticPageMetadata("politica-confidentialitate", fallbackMetadata);
}

const index = async () => {
  const page = await getStaticPageBySlug("politica-confidentialitate");
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
      {page ? <StaticPageContent page={page} /> : <AboutUs />}
    </>
  );
};

export default index;
