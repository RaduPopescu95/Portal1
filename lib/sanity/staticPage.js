import { getStaticPageBySlug } from "./queries";
import { buildMetadataFromSeo } from "./seo";

export async function getStaticPageMetadata(slug, fallback) {
  const page = await getStaticPageBySlug(slug);
  const path = `/${slug}`;

  return buildMetadataFromSeo({
    title: page?.seo?.metaTitle || page?.h1 || page?.title || fallback.title,
    description:
      page?.seo?.metaDescription || page?.intro || fallback.description,
    path: page?.seo?.canonical || path,
    image: page?.seo?.socialImage,
    noIndex: page?.seo?.noIndex,
  });
}

