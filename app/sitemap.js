import {
  handleGetFirestore,
} from "@/utils/firestoreUtils";
import { transferaImagini } from "@/utils/localProjectlUtils";
import { replaceSpacesWithDashes } from "@/utils/strintText";
import { parseDateToISO } from "@/utils/timeUtils";
import { slugifyFirma } from "@/utils/slugify";

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://firmeamenajarigradina.ro";

export default async function sitemap() {
  const judeteData = await handleGetFirestore("Judete");

  const parteners = await handleGetFirestore("Firme");
  const parteneri = await transferaImagini(parteners);

  const articole = await handleGetFirestore("Articole");

  const seenUrls = new Set();

  const localitatiCategorii = parteneri.reduce((acc, partener) => {
    if (partener.categorie && partener.localitate) {
      const url = `${SITE_URL}/${replaceSpacesWithDashes(
        partener.categorie.toLowerCase()
      )}-${replaceSpacesWithDashes(partener.localitate.toLowerCase())}`;
      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        acc.push({
          url,
          lastModified:
            parseDateToISO(partener.firstUploadDate) ||
            new Date().toISOString(),
        });
      }
    }
    return acc;
  }, []);

  const localitati = parteneri.reduce((acc, partener) => {
    if (partener.judet && partener.localitate) {
      const url = `${SITE_URL}/amenajari-gradini-${replaceSpacesWithDashes(
        partener.localitate.toLowerCase()
      )}`;
      if (!seenUrls.has(url)) {
        seenUrls.add(url);

        const imageUrl =
          partener.imagini &&
          partener.imagini.imgs &&
          partener.imagini.imgs[0] &&
          partener.imagini.imgs[0].finalUri
            ? partener.imagini.imgs[0].finalUri
            : null;

        const sitemapEntry = {
          url,
          lastModified:
            parseDateToISO(partener.firstUploadDate) ||
            new Date().toISOString(),
        };

        if (imageUrl) {
          sitemapEntry.image = { url: imageUrl };
        }

        acc.push(sitemapEntry);
      }
    }
    return acc;
  }, []);

  const judete = parteneri.reduce((acc, partener) => {
    if (partener.judet) {
      const url = `${SITE_URL}/judet/${replaceSpacesWithDashes(
        partener.judet.toLowerCase()
      )}`;
      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        acc.push({
          url,
          lastModified:
            parseDateToISO(partener.firstUploadDate) ||
            new Date().toISOString(),
        });
      }
    }
    return acc;
  }, []);

  const firmeDetail = parteneri.reduce((acc, partener) => {
    const slug = partener.slug || slugifyFirma(partener);
    if (!slug) return acc;
    const url = `${SITE_URL}/firma/${slug}`;
    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      const imageUrl = partener?.imagini?.imgs?.[0]?.finalUri || null;
      const entry = {
        url,
        lastModified:
          parseDateToISO(partener.lastUpdateDate) ||
          parseDateToISO(partener.firstUploadDate) ||
          new Date().toISOString(),
      };
      if (imageUrl) entry.image = { url: imageUrl };
      acc.push(entry);
    }
    return acc;
  }, []);

  const blogRoutes = (articole || []).reduce((acc, a) => {
    const slugOrId = a.slug || a.id;
    if (!slugOrId) return acc;
    const url = `${SITE_URL}/blog/${slugOrId}`;
    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      acc.push({
        url,
        lastModified:
          parseDateToISO(a.firstUploadDate) || new Date().toISOString(),
      });
    }
    return acc;
  }, []);

  const staticRoutes = [
    "/",
    "/despre-noi",
    "/cum-functioneaza",
    "/politica-cookie",
    "/politica-confidentialitate",
    "/cauta",
    "/amenajari-gradini",
    "/blog",
    "/contact",
    "/inscrie-firma",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...staticRoutes,
    ...judete,
    ...localitatiCategorii,
    ...localitati,
    ...firmeDetail,
    ...blogRoutes,
  ];
}
