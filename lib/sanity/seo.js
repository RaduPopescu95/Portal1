const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return SITE_URL;
  if (String(pathOrUrl).startsWith("http")) return pathOrUrl;
  const path = String(pathOrUrl).startsWith("/")
    ? String(pathOrUrl)
    : `/${pathOrUrl}`;
  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}

export function buildMetadataFromSeo({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}) {
  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      url: path,
      images: image?.finalUri ? [{ url: image.finalUri, alt: image.alt }] : undefined,
    },
    alternates: {
      canonical: path,
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

