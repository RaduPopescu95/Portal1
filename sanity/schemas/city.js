import { defineField, defineType } from "sanity";

export const city = defineType({
  name: "city",
  title: "Localitate",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume localitate",
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
      name: "county",
      title: "Judet",
      type: "reference",
      to: [{ type: "county" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coordinates",
      title: "Coordonate",
      type: "geopoint",
    }),
    defineField({
      name: "shortDescription",
      title: "Descriere scurta",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seoPriority",
      title: "Prioritate SEO",
      type: "number",
      description: "Numar mai mare = oras prioritar pentru continut si linkare.",
      initialValue: 0,
    }),
  ],
});

