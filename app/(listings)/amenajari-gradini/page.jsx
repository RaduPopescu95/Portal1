import SliderStyle from "@/components/listing-style/slider-style";
import { handleGetFirestore } from "@/utils/firestoreUtils";

import { fetchFirme, transferaImagini } from "@/utils/localProjectlUtils";
import { cache } from "react";
import { filtrareOferte } from "@/utils/commonUtils";
import JsonLd, { BreadcrumbsJsonLd } from "@/components/common/JsonLd";
import { buildItemListLd } from "@/utils/schemaOrg";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const metadata = {
  title: "Firme de proiectare, amenajare si intretinere spatii verzi",
  description:
    "Cauti un partener de incredere pentru gradina ta rezidentiala sau comerciala? Vezi firmele de amenajari spatii verzi din toata Romania.",
  openGraph: {
    title: "Firme de proiectare, amenajare si intretinere spatii verzi",
    description:
      "Cauti un partener de incredere pentru gradina ta rezidentiala sau comerciala? Vezi firmele de amenajari spatii verzi din toata Romania.",
    url: "/amenajari-gradini",
  },
  alternates: {
    canonical: "/amenajari-gradini",
  },
};

export const revalidate = 60; // revalidate at most every minute , hour at 3600

const getFirme = cache(async (params) => {
  let firme = fetchFirme(params);
  return firme;
});

export async function getServerData(params, searchParams) {
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
    let firms = await getFirme(params);
    let firme = await transferaImagini(firms);
    let firmeFinal = [];
    if (searchParams) {
      firmeFinal = await filtrareOferte(firme, searchParams);
    } else {
      firmeFinal = [...firme];
    }
    data = { judete, categorii, firme: firmeFinal };
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

const index = async ({ params, searchParams }) => {
  const data = await getServerData(params, searchParams.slug);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Firme de proiectare, amenajare si intretinere spatii verzi",
    description:
      "Cauti un partener de incredere pentru gradina ta rezidentiala sau comerciala? Vezi firmele de amenajari spatii verzi din toata Romania.",
    url: `${SITE_URL}/amenajari-gradini`,
  };

  const itemListLd = buildItemListLd(data.firme, SITE_URL);

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={itemListLd} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Acasa", path: "/" },
          { name: "Amenajari gradini", path: "/amenajari-gradini" },
        ]}
      />

      <SliderStyle
        params={params.clinici}
        judete={data.judete}
        categorii={data.categorii}
        firme={data.firme}
        searchParams={searchParams.slug}
        h1Title="Firme de proiectare, amenajare si intretinere spatii verzi in Romania"
      />
    </>
  );
};

export default index;
