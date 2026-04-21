import AboutUs from "@/components/about-us";
import { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import StaticPageContent from "@/components/sanity/StaticPageContent";
import { getStaticPageBySlug } from "@/lib/sanity/queries";
import { getStaticPageMetadata } from "@/lib/sanity/staticPage";

const fallbackMetadata = {
  title: "Politica de cookie",
  description:
    "Politica de utilizare a fisierelor cookie pe FirmeAmenajariGradina.ro.",
};

export async function generateMetadata() {
  return getStaticPageMetadata("politica-cookie", fallbackMetadata);
}

const index = async () => {
  const page = await getStaticPageBySlug("politica-cookie");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Politica de cookie", path: "/politica-cookie" },
        ]}
      />
      {page ? <StaticPageContent page={page} /> : <AboutUs />}
    </>
  );
};

export default index;
