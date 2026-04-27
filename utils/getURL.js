// utils/getURL.js
import { SITE_URL } from "./siteUrl";

const IS_SERVER = typeof window === "undefined";

function getURL(path) {
  const baseURL = IS_SERVER ? SITE_URL : window.location.origin;

    return new URL(path, baseURL).toString();
}
