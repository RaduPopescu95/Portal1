// "use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
// import ScrollToTop from "@/components/common/ScrollTop";
import "../public/assets/scss/index.scss";
import { Nunito } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
// import CookieBanner from "@/components/Cookies/CookieBanner";
// import { AuthProvider } from "@/context/AuthContext";
// import { LoadScript } from "@react-google-maps/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export const metadata = {
  title: {
    default:
      "Firme Amenajari Gradini si Spatii Verzi | Peisagisti Romania",
    template: "%s | FirmeAmenajariGradina.ro",
  },
  description:
    "Director national cu firme de amenajari gradini, peisagisti si servicii de intretinere spatii verzi. Gaseste specialisti din orasul tau.",
  applicationName: "FirmeAmenajariGradina.ro",
  keywords: [
    "amenajari gradini",
    "peisagisti",
    "amenajari spatii verzi",
    "firme gradinarit",
    "proiectare gradini",
    "intretinere spatii verzi",
  ],
  authors: [{ name: "FirmeAmenajariGradina.ro" }],
  creator: "FirmeAmenajariGradina.ro",
  publisher: "FirmeAmenajariGradina.ro",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "/",
    siteName: "FirmeAmenajariGradina.ro",
    title:
      "Firme Amenajari Gradini si Spatii Verzi | Peisagisti Romania",
    description:
      "Director national cu firme de amenajari gradini, peisagisti si servicii de intretinere spatii verzi.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "FirmeAmenajariGradina.ro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Firme Amenajari Gradini si Spatii Verzi | Peisagisti Romania",
    description:
      "Director national cu firme de amenajari gradini, peisagisti si servicii de intretinere spatii verzi.",
    images: ["/og-default.jpg"],
  },
  // Icons: favicon is provided via app/favicon.ico (file-based convention).
  // apple-touch-icon is emitted as a manual <link> in <head> below because
  // Next.js ignores metadata.icons when app/favicon.ico exists.
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  // robots: NU se seteaza aici; app/robots.js gestioneaza global.
};

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const libraries = ["places"];
  return (
    <html lang="ro">
      <head>
        <link
          rel="preconnect"
          href="https://firebasestorage.googleapis.com"
        />
        <link
          rel="dns-prefetch"
          href="https://firebasestorage.googleapis.com"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </head>
      <body className={nunito.className}>
        {/* <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          libraries={libraries}
        > */}
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
        {/* </LoadScript> */}
        {/* <ScrollToTop /> */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
