import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "from",
      title: "De la",
      type: "string",
      description: "Path vechi, ex: /vechiul-url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "to",
      title: "Catre",
      type: "string",
      description: "Path nou, ex: /noul-url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "permanent",
      title: "Permanent 301",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

