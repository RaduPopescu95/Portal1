import HomeMain from "@/components/home-4";
import { handleGetFirestore } from "@/utils/firestoreUtils";
import { fetchFirme } from "@/utils/localProjectlUtils";
import { cache } from "react";

// export const metadata = {
//   title: "HomePage",
//   description: "HomePage",
// };

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

const index = async () => {
  const articole = await handleGetFirestore("Articole");

  const categorii = await handleGetFirestore("Categorii");

  const data = await getServerData(null);

  return (
    <>
      <HomeMain categorii={categorii} articole={articole} firme={data.firme} />
    </>
  );
};

export default index;
