import Judete from "../../../../components/judete";
import {
  handleQueryFirestore,
  handleQueryFirestoreSubcollection,
} from "@/utils/firestoreUtils";
import {
  fetchJudeteParams,
  transferaImagini,
} from "@/utils/localProjectlUtils";
import { notFound } from "next/navigation";
import { filtrareOferte } from "@/utils/commonUtils";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildItemListLd } from "@/utils/schemaOrg";

export const revalidate = 60; // revalidate at most every minute , hour at 3600

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

// Reconstruieste numele real al judetului din slug-ul URL
// slug "bistrita-nasaud" -> "Bistrita Nasaud"
function slugToJudetName(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map((w) => (w.length ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

export async function generateStaticParams() {
  let combinatii = await fetchJudeteParams();
  return combinatii.map((judet) => ({
    id: judet,
  }));
}

export async function generateMetadata({ params }) {
  const judetParam = slugToJudetName(params.id);
  const title = `Specialisti in peisagistica si gradinarit ${judetParam}`;
  const description = `Firme serioase de amenajari gradini si spatii verzi din judetul ${judetParam}. Vezi peisagistii recomandati si cere oferta acum.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/judet/${params.id}`,
    },
    alternates: {
      canonical: `${SITE_URL}/judet/${params.id}`,
    },
  };
}

export async function getServerData(params, searchParams) {
  let data = {};
  let localitati = [];
  let firme = [];

  try {
    const judetParam = slugToJudetName(params.id);

    localitati = await handleQueryFirestoreSubcollection(
      "Localitati",
      "judet",
      judetParam
    );

    firme = await handleQueryFirestore("Firme", "judet", judetParam);

    let firms = await transferaImagini(firme);
    let firmeFinal = [];
    if (searchParams) {
      firmeFinal = await filtrareOferte(firms, searchParams);
    } else {
      firmeFinal = [...firms];
    }

    data = { localitati, firms: firmeFinal };
  } catch (error) {
    console.error("Failed to fetch data....:", error);
    return {
      props: {
        error: "Failed to load data.",
      },
    };
  }
  return data;
}

const index = async ({ params, searchParams }) => {
  if (params.id === "favicon.ico") {
    return null;
  }

  const judetParam = slugToJudetName(params.id);

  const data = await getServerData(params, searchParams.slug);

  if (!data.firms) {
    notFound();
  }

  const h1Title = `Firme de amenajari gradini si spatii verzi in ${judetParam}`;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Specialisti in peisagistica si gradinarit ${judetParam}`,
    description: `Firme serioase de amenajari gradini si spatii verzi din judetul ${judetParam}.`,
    url: `${SITE_URL}/judet/${params.id}`,
  };

  const itemListLd = buildItemListLd(data.firms, SITE_URL);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Judete", path: "/amenajari-gradini" },
          { name: judetParam, path: `/judet/${params.id}` },
        ]}
      />

      <Judete
        data={data}
        judet={judetParam}
        h1Title={h1Title}
        params={params}
        searchParams={searchParams.slug}
      />
    </>
  );
};

export default index;
