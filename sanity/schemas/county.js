import { defineField, defineType } from "sanity";

export const county = defineType({
  name: "county",
  title: "Judet",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume judet",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug compatibil /judet/[id]",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro SEO",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "content",
      title: "Continut judet",
      type: "portableContent",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});

