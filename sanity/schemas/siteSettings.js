import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Setari site",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nume site",
      type: "string",
      initialValue: "FirmeAmenajariGradina.ro",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "defaultSeo",
      title: "SEO implicit",
      type: "seo",
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Google site verification",
      type: "string",
    }),
  ],
});

