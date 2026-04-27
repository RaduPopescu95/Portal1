import { buildBreadcrumbListLd } from "@/utils/schemaOrg";

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
  const data = buildBreadcrumbListLd(items);
  return <JsonLd data={data} />;
}

export default JsonLd;
