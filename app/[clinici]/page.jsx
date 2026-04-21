import SliderStyle from "@/components/listing-style/slider-style";
import {
  handleGetFirestore,
} from "@/utils/firestoreUtils";
import {
  fetchFirme,
  fetchFirmeParams,
  transferaImagini,
} from "@/utils/localProjectlUtils";
import { notFound } from "next/navigation";
import { filtrareOferte } from "@/utils/commonUtils";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildItemListLd } from "@/utils/schemaOrg";
import { replaceDashesWithSpaces } from "@/utils/strintText";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const revalidate = 60;

const getFirme = async (params, cats) => {
  let firme = fetchFirme(params, cats);
  return firme;
};

export async function generateStaticParams() {
  let combinatii = await fetchFirmeParams();
  return combinatii.map((post) => ({
    clinici: post,
  }));
}

function deriveCategorieLocalitate(clinici, categorii) {
  const parts = (clinici || "").split("-");
  const catSlugs = (categorii || []).map((cat) =>
    (cat.siteName || "").toLowerCase().replace(/\s+/g, "-")
  );
  catSlugs.push("clinici");
  let matched = "";
  let matchedIndex = -1;
  for (let i = 0; i < parts.length; i++) {
    const potential = parts.slice(0, i + 1).join("-");
    if (catSlugs.includes(potential)) {
      matched = potential;
      matchedIndex = i;
    }
  }
  const localitate = parts.slice(matchedIndex + 1).join("-");
  return {
    categorieSlug: matched,
    categorie: replaceDashesWithSpaces(matched),
    localitateSlug: localitate,
    localitate: replaceDashesWithSpaces(localitate),
  };
}

export async function generateMetadata({ params }) {
  const categorii = await handleGetFirestore("Categorii");
  const { categorie, localitate } = deriveCategorieLocalitate(
    params.clinici,
    categorii
  );

  const firms = await getFirme(params, categorii);
  const count = Array.isArray(firms) ? firms.length : 0;

  const prettyCat = (categorie || "servicii").toLowerCase();
  const prettyLoc = localitate
    ? localitate.charAt(0).toUpperCase() + localitate.slice(1)
    : "";

  const title = prettyLoc
    ? `Firme de ${prettyCat} in ${prettyLoc} (${count}) – FirmeAmenajariGradina.ro`
    : `Firme de ${prettyCat} – FirmeAmenajariGradina.ro`;
  const description = prettyLoc
    ? `Vezi ${count} firme de ${prettyCat} in ${prettyLoc}. Contact, servicii si recenzii verificate pe FirmeAmenajariGradina.ro.`
    : `Vezi firme de ${prettyCat} recomandate pe FirmeAmenajariGradina.ro.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${params.clinici}`,
    },
    alternates: {
      canonical: `/${params.clinici}`,
    },
  };
}

async function getServerData(params, searchParams) {
  try {
    const judete = await handleGetFirestore("Judete");
    const categorii = await handleGetFirestore("Categorii");
    const firms = await getFirme(params, categorii);
    const firme = await transferaImagini(firms);
    const firmeFinal = [...firme];
    return { judete, categorii, firme: firmeFinal };
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return { judete: [], categorii: [], firme: [] };
  }
}

const index = async ({ params, searchParams = null }) => {
  const data = await getServerData(params);
  if (!data.firme || data.firme.length === 0) {
    notFound();
  }

  const { categorie, localitate } = deriveCategorieLocalitate(
    params.clinici,
    data.categorii
  );

  const pagePath = `/${params.clinici}`;
  const prettyCat = (categorie || "amenajari gradini").toLowerCase();
  const prettyLoc = localitate
    ? localitate.charAt(0).toUpperCase() + localitate.slice(1)
    : "";
  const h1Title = prettyLoc
    ? `Firme de ${prettyCat} in ${prettyLoc}`
    : `Firme de ${prettyCat}`;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: h1Title,
    url: `${SITE_URL}${pagePath}`,
    description: `Lista firmelor de ${prettyCat}${
      prettyLoc ? ` din ${prettyLoc}` : ""
    } listate pe FirmeAmenajariGradina.ro.`,
  };

  const itemListLd = buildItemListLd(data.firme, SITE_URL);

  const breadcrumbs = [{ name: "Acasa", path: "/" }];
  const primaFirma = data.firme[0];
  if (primaFirma?.judet) {
    breadcrumbs.push({
      name: primaFirma.judet,
      path: `/judet/${primaFirma.judet.toLowerCase().replace(/ /g, "-")}`,
    });
  }
  breadcrumbs.push({ name: h1Title, path: pagePath });

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <SliderStyle
        params={params.clinici}
        judete={data.judete}
        categorii={data.categorii}
        firme={data.firme}
        renderMode="listing"
        h1Title={h1Title}
      />
    </>
  );
};

export default index;
