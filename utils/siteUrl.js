const DEFAULT_SITE_URL = "https://www.firmeamenajarigradina.ro";
const CANONICAL_HOSTNAME = "www.firmeamenajarigradina.ro";
const ROOT_HOSTNAME = "firmeamenajarigradina.ro";

function normalizeSiteUrl(value) {
  const url = String(value || "").trim() || DEFAULT_SITE_URL;
  return url.replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return SITE_URL;

  const value = String(pathOrUrl);
  if (/^https?:\/\//i.test(value)) return value;

  const path = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${path}`;
}

export function canonicalUrl(pathOrUrl) {
  if (!pathOrUrl) return DEFAULT_SITE_URL;

  const value = String(pathOrUrl).trim();

  if (/^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      const hostname = url.hostname.toLowerCase();

      if (hostname === ROOT_HOSTNAME || hostname === CANONICAL_HOSTNAME) {
        return `${DEFAULT_SITE_URL}${url.pathname}${url.search}`;
      }

      return value;
    } catch {
      return absoluteUrl(value);
    }
  }

  const path = value.startsWith("/") ? value : `/${value}`;
  return `${DEFAULT_SITE_URL}${path}`;
}
