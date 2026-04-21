export const META_TITLE_MIN = 30;
export const META_TITLE_MAX = 60;
export const META_DESCRIPTION_MIN = 120;
export const META_DESCRIPTION_MAX = 160;

export function validateMetaTitle(value) {
  const str = (value || "").trim();
  if (!str) return "Meta Title este obligatoriu.";
  if (str.length < META_TITLE_MIN)
    return `Meta Title prea scurt (${str.length}/${META_TITLE_MIN}-${META_TITLE_MAX}).`;
  if (str.length > META_TITLE_MAX)
    return `Meta Title prea lung (${str.length}/${META_TITLE_MIN}-${META_TITLE_MAX}).`;
  return null;
}

export function validateMetaDescription(value) {
  const str = (value || "").trim();
  if (!str) return "Meta Description este obligatorie.";
  if (str.length < META_DESCRIPTION_MIN)
    return `Meta Description prea scurta (${str.length}/${META_DESCRIPTION_MIN}-${META_DESCRIPTION_MAX}).`;
  if (str.length > META_DESCRIPTION_MAX)
    return `Meta Description prea lunga (${str.length}/${META_DESCRIPTION_MIN}-${META_DESCRIPTION_MAX}).`;
  return null;
}

export function validateMetaFields({ metaTitle, metaDescription }) {
  const errors = [];
  const titleErr = validateMetaTitle(metaTitle);
  if (titleErr) errors.push(titleErr);
  const descErr = validateMetaDescription(metaDescription);
  if (descErr) errors.push(descErr);
  return errors;
}

export function getCounterClass(length, min, max) {
  if (length === 0) return "text-muted";
  if (length < min || length > max) return "text-danger";
  return "text-success";
}
