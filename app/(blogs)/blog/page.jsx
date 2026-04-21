import BlogV1 from "@/components/blog-list-1";
import { BreadcrumbsJsonLd } from "@/components/common/JsonLd";

export const metadata = {
  title: "Blog amenajari gradini si spatii verzi",
  description:
    "Articole, ghiduri si sfaturi pentru amenajarea si intretinerea gradinilor si spatiilor verzi.",
  openGraph: {
    title: "Blog amenajari gradini si spatii verzi",
    description:
      "Articole, ghiduri si sfaturi pentru amenajarea si intretinerea gradinilor si spatiilor verzi.",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

const index = () => {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <BlogV1 />
    </>
  );
};

export default index;
