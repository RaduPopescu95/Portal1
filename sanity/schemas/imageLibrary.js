import { defineField, defineType } from "sanity";

export const imageLibrary = defineType({
  name: "imageLibrary",
  title: "Galerie imagini",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu galerie",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug intern",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "keywords",
      title: "Cuvinte cheie imagini",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Imagini",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) => Rule.max(50),
    }),
  ],
});

