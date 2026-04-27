import BlogV1 from "@/components/blog-list-1";
import { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { getArticles } from "@/lib/sanity/queries";
import { canonicalUrl } from "@/utils/siteUrl";
import { DEFAULT_OG_IMAGE } from "@/utils/seoDefaults";

export const metadata = {
  title: "Blog amenajari gradini si spatii verzi",
  description:
    "Articole, ghiduri si sfaturi pentru amenajarea si intretinerea gradinilor si spatiilor verzi.",
  openGraph: {
    title: "Blog amenajari gradini si spatii verzi",
    description:
      "Articole, ghiduri si sfaturi pentru amenajarea si intretinerea gradinilor si spatiilor verzi.",
    url: canonicalUrl("/blog"),
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: canonicalUrl("/blog"),
  },
};

const index = async () => {
  const articole = await getArticles({ limit: 100 });

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <BlogV1 articole={articole} />
    </>
  );
};

export default index;
