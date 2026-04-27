import { absoluteUrl, canonicalUrl } from "@/utils/siteUrl";
import { DEFAULT_OG_IMAGE } from "@/utils/seoDefaults";

export { absoluteUrl, canonicalUrl };

export function buildMetadataFromSeo({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}) {
  const canonical = canonicalUrl(path);
  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      images: image?.finalUri
        ? [{ url: image.finalUri, alt: image.alt }]
        : [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical,
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
