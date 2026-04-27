// "use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
// import ScrollToTop from "@/components/common/ScrollTop";
import "../public/assets/scss/index.scss";
import { Nunito } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getSiteSettings } from "@/lib/sanity/queries";
import { canonicalUrl } from "@/utils/siteUrl";
import { DEFAULT_OG_IMAGE } from "@/utils/seoDefaults";
import JsonLd from "@/components/common/JsonLd";
import { buildOrganizationLd } from "@/utils/schemaOrg";
// import CookieBanner from "@/components/Cookies/CookieBanner";
// import { AuthProvider } from "@/context/AuthContext";
// import { LoadScript } from "@react-google-maps/api";

const defaultMetadata = {
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
  metadataBase: new URL(canonicalUrl("/")),
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: canonicalUrl("/"),
    siteName: "FirmeAmenajariGradina.ro",
    title:
      "Firme Amenajari Gradini si Spatii Verzi | Peisagisti Romania",
    description:
      "Director national cu firme de amenajari gradini, peisagisti si servicii de intretinere spatii verzi.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Firme Amenajari Gradini si Spatii Verzi | Peisagisti Romania",
    description:
      "Director national cu firme de amenajari gradini, peisagisti si servicii de intretinere spatii verzi.",
    images: [DEFAULT_OG_IMAGE.url],
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

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const defaultSeo = settings?.defaultSeo;
  const title =
    defaultSeo?.metaTitle || defaultMetadata.title.default;
  const description =
    defaultSeo?.metaDescription || defaultMetadata.description;
  const socialImage = defaultSeo?.socialImage?.finalUri
    ? [
        {
          url: defaultSeo.socialImage.finalUri,
          width: defaultSeo.socialImage.width || 1200,
          height: defaultSeo.socialImage.height || 630,
          alt: defaultSeo.socialImage.alt || settings?.title || title,
        },
      ]
    : defaultMetadata.openGraph.images;

  return {
    ...defaultMetadata,
    title: {
      ...defaultMetadata.title,
      default: title,
    },
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      images: socialImage,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: socialImage.map((image) => image.url),
    },
    verification: {
      google:
        settings?.googleSiteVerification ||
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
        undefined,
    },
  };
}

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const libraries = ["places"];
  const organizationLd = buildOrganizationLd();
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
        <JsonLd data={organizationLd} />
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
