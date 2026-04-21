import { buildBreadcrumbListLd } from "@/utils/schemaOrg";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbsJsonLd({ items }) {
  const data = buildBreadcrumbListLd(items, SITE_URL);
  return <JsonLd data={data} />;
}

export default JsonLd;
