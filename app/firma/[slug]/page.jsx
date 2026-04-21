import SliderStyle from "@/components/listing-style/slider-style";
import {
  handleGetFirestore,
  handleQueryFirestore,
} from "@/utils/firestoreUtils";
import { transferaImagini } from "@/utils/localProjectlUtils";
import { notFound } from "next/navigation";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildLocalBusinessLd } from "@/utils/schemaOrg";
import { slugifyFirma } from "@/utils/slugify";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const revalidate = 60;

async function getFirmaBySlug(slug) {
  if (!slug) return null;
  let matches = await handleQueryFirestore("Firme", "slug", slug);
  if (!matches || matches.length === 0) {
    // Fallback: derive slug from siteName + localitate for firme without stored slug
    const all = await handleGetFirestore("Firme");
    matches = (all || []).filter((f) => slugifyFirma(f) === slug);
  }
  if (!matches || matches.length === 0) return null;
  const [firma] = await transferaImagini([matches[0]]);
  return firma;
}

export async function generateStaticParams() {
  try {
    const firme = await handleGetFirestore("Firme");
    const slugs = new Set();
    (firme || []).forEach((f) => {
      const s = f.slug || slugifyFirma(f);
      if (s) slugs.add(s);
    });
    return Array.from(slugs).map((slug) => ({ slug }));
  } catch (err) {
    console.error("generateStaticParams firma failed", err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const firma = await getFirmaBySlug(params.slug);
  const pagePath = `/firma/${params.slug}`;
  if (!firma) {
    return {
      title: "Firma negasita",
      alternates: { canonical: pagePath },
      robots: { index: false, follow: false },
    };
  }
  const title =
    firma.metaTitle ||
    `${firma.siteName} – firma amenajari gradini in ${firma.localitate || ""}`.trim();
  const description =
    firma.metaDescription ||
    "Vezi detalii, contact si servicii pe FirmeAmenajariGradina.ro.";
  const imageUrl = firma?.imagini?.imgs?.[0]?.finalUri;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pagePath,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    alternates: { canonical: pagePath },
  };
}

const Page = async ({ params }) => {
  const firma = await getFirmaBySlug(params.slug);
  if (!firma) {
    notFound();
  }

  const judete = await handleGetFirestore("Judete");
  const categorii = await handleGetFirestore("Categorii");

  const pagePath = `/firma/${params.slug}`;
  const localBusinessLd = buildLocalBusinessLd(firma, SITE_URL, pagePath);

  const breadcrumbs = [{ name: "Acasa", path: "/" }];
  if (firma?.judet) {
    breadcrumbs.push({
      name: firma.judet,
      path: `/judet/${firma.judet.toLowerCase().replace(/ /g, "-")}`,
    });
  }
  if (firma?.siteName) {
    breadcrumbs.push({ name: firma.siteName, path: pagePath });
  }

  return (
    <>
      <JsonLd data={localBusinessLd} />
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <SliderStyle
        params={params.slug}
        judete={judete}
        categorii={categorii}
        firme={[firma]}
        renderMode="detail"
        h1Title={firma.siteName}
      />
    </>
  );
};

export default Page;
