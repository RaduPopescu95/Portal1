import SliderStyle from "@/components/listing-style/slider-style";
import { unstable_noStore as noStore } from "next/cache";
import {
  handleGetFirestore,
  handleQueryDoubleParam,
  handleQueryFirestore,
} from "@/utils/firestoreUtils";
import { fetchFirme } from "@/utils/localProjectlUtils";

import { cache } from "react";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildItemListLd } from "@/utils/schemaOrg";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const metadata = {
  title: "Cauta firme de amenajari spatii verzi",
  description:
    "Cauta un furnizor de servicii de amenajari spatii verzi in apropiere si solicita o oferta personalizata.",
  openGraph: {
    title: "Cauta firme de amenajari spatii verzi",
    description:
      "Cauta un furnizor de servicii de amenajari spatii verzi in apropiere si solicita o oferta personalizata.",
    url: "/cauta",
  },
  alternates: {
    canonical: "/cauta",
  },
};

export const revalidate = 60; // revalidate at most every minute , hour at 3600

const getFirme = cache(async (params, categorii) => {
  let firme = fetchFirme(params, categorii);
  return firme;
});

export async function getServerData(params) {
  let data = {};

  try {
    console.log("params..start.....", params);
    // if (params[1] === "favicon.ico") {
    //   return null; // Returnează null sau orice alt component care indică că pagina nu trebuie să proceseze acest id.
    // }
    console.log("params..start.....passed", params);
    // Interoghează Firestore (sau orice altă bază de date) folosind 'locationPart'
    let judete = await handleGetFirestore("Judete");
    let categorii = await handleGetFirestore("Categorii");
    console.log("here...params...", params);
    let firme = await getFirme(params, categorii);

    data = { judete, categorii, firme };
    return data;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return {
      props: {
        error: "Failed to load data.",
      },
    };
  }
}

const index = async ({ params }) => {
  const data = await getServerData(params);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cauta firme de amenajari spatii verzi",
    description:
      "Cauta un furnizor de servicii de amenajari spatii verzi in apropiere si solicita o oferta personalizata.",
    url: `${SITE_URL}/cauta`,
  };

  const itemListLd = buildItemListLd(data.firme, SITE_URL);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Cauta", path: "/cauta" },
        ]}
      />

      <SliderStyle
        params={params.clinici}
        judete={data.judete}
        categorii={data.categorii}
        firme={data.firme}
        h1Title="Cauta firme de amenajari gradini si spatii verzi"
      />
    </>
  );
};

export default index;
