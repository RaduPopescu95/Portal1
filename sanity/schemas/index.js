import {
  faqItem,
  imageWithAlt,
  internalLink,
  portableContent,
  seo,
} from "./objects";
import { article } from "./article";
import { city } from "./city";
import { company } from "./company";
import { county } from "./county";
import { imageLibrary } from "./imageLibrary";
import { localLandingPage } from "./localLandingPage";
import { redirect } from "./redirect";
import { serviceCategory } from "./serviceCategory";
import { siteSettings } from "./siteSettings";
import { staticPage } from "./staticPage";

export const schemaTypes = [
  seo,
  imageWithAlt,
  faqItem,
  internalLink,
  portableContent,
  siteSettings,
  county,
  city,
  serviceCategory,
  imageLibrary,
  company,
  localLandingPage,
  article,
  staticPage,
  redirect,
];
