import NotFound from "@/components/404";

export const metadata = {
  title: "Pagina nu a fost gasita",
  description: "Pagina cautata nu exista pe FirmeAmenajariGradina.ro.",
  robots: {
    index: false,
    follow: false,
  },
};

const index = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default index;
