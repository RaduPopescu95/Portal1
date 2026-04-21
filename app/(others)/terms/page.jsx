import Terms from "@/components/terms-conditions";
import { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import StaticPageContent from "@/components/sanity/StaticPageContent";
import { getStaticPageBySlug } from "@/lib/sanity/queries";
import { getStaticPageMetadata } from "@/lib/sanity/staticPage";

const fallbackMetadata = {
  title: "Termeni si conditii",
  description:
    "Termenii si conditiile de utilizare a portalului FirmeAmenajariGradina.ro.",
};

export async function generateMetadata() {
  return getStaticPageMetadata("terms", fallbackMetadata);
}

const index = async () => {
  const page = await getStaticPageBySlug("terms");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Termeni si conditii", path: "/terms" },
        ]}
      />
      {page ? <StaticPageContent page={page} /> : <Terms />}
    </>
  );
};

export default index;
