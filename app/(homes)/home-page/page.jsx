import HomeMain from "@/components/home-4";
import {
  getArticles,
  getPublishedCompanies,
  getServiceCategories,
} from "@/lib/sanity/queries";

// export const metadata = {
//   title: "HomePage",
//   description: "HomePage",
// };

const index = async () => {
  const [articole, categorii, firme] = await Promise.all([
    getArticles({ limit: 6 }),
    getServiceCategories(),
    getPublishedCompanies({ limit: 12 }),
  ]);

  return (
    <>
      <HomeMain categorii={categorii} articole={articole} firme={firme} />
    </>
  );
};

export default index;
