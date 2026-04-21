import Service from "@/components/service";
import StaticPageContent from "@/components/sanity/StaticPageContent";
import { getStaticPageBySlug } from "@/lib/sanity/queries";
import { getStaticPageMetadata } from "@/lib/sanity/staticPage";

const fallbackMetadata = {
  title: "Servicii",
  description: "Servicii de amenajari gradini si spatii verzi.",
};

export async function generateMetadata() {
  return getStaticPageMetadata("service", fallbackMetadata);
}

const index = async () => {
  const page = await getStaticPageBySlug("service");
  return (
    <>
      {page ? <StaticPageContent page={page} /> : <Service />}
    </>
  );
};

export default index;
