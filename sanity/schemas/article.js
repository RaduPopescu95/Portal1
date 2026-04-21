import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Articol",
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
      title: "Slug /blog/[slug]",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "published",
      title: "Publicat",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Data publicarii",
      type: "datetime",
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "FirmeAmenajariGradina.ro",
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "reference",
      to: [{ type: "serviceCategory" }],
    }),
    defineField({
      name: "image",
      title: "Imagine principala",
      type: "imageWithAlt",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Continut articol",
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

