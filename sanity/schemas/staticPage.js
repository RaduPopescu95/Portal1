import { defineField, defineType } from "sanity";

export const staticPage = defineType({
  name: "staticPage",
  title: "Pagina statica",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Fara slash. Ex: despre-noi, contact, politica-cookie",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "published",
      title: "Publicata",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "h1",
      title: "H1",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "content",
      title: "Continut",
      type: "portableContent",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});

