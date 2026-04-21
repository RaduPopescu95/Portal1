import { defineField, defineType } from "sanity";

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Categorie serviciu",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume categorie",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descriere",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "imageWithAlt",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});

