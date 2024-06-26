export function testString(str) {
  const pattern = /^variation-\d+-lang-\w+$/;
  return pattern.test(str);
}

export const normalizeString = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

export const emailWithoutSpace = (email) => {
  const newEmail = email.replace(/\s/g, "");

  return newEmail;
};

export const handleDiacrtice = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export function replaceSpacesWithDashes(str) {
  console.log("Str...in....replaceSpacesWithDashes...", str);
  return str.replace(/ /g, "-");
}

export function replaceDashesWithSpaces(str) {
  console.log("Str...in....replaceDashesWithSpaces...", str);
  return str.replace(/-/g, " ");
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
