export function slugify(str) {
  if (!str) return "";
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function slugifyFirma(firma) {
  if (!firma) return "";
  const base = [firma.siteName, firma.localitate].filter(Boolean).join(" ");
  return slugify(base);
}
