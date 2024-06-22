import Wrapper from "@/components/layout/Wrapper";
import HomeMain from "./(homes)/home-page/page";

export const metadata = {
  title: "Amenajari Gradini – Amenajari Spatii Verzi – Peisagisti",
  description:
    "Cauti o firma de amenajari gradini care sa amenajeze spatiu tau residential sau sediul companiei tale? Vezi specialistii in amenajari spatii verzi de pe portal",
  openGraph: {
    title: "Amenajari Gradini – Amenajari Spatii Verzi – Peisagisti",
    description:
      "Cauti o firma de amenajari gradini care sa amenajeze spatiu tau residential sau sediul companiei tale? Vezi specialistii in amenajari spatii verzi de pe portal",
  },
  alternates: {
    canonical: `https://www.portal.ro/`,
  },
  manifest: "https://portal.ro/manifest.json",
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 60; // revalidate at most every minute , hour at 3600

export default function Home() {
  return (
    <Wrapper>
      <HomeMain />
    </Wrapper>
  );
}
