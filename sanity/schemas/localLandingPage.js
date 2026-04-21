import { defineField, defineType } from "sanity";

export const localLandingPage = defineType({
  name: "localLandingPage",
  title: "Pagina locala SEO",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu intern",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug URL existent",
      type: "slug",
      description: "Fara slash. Ex: amenajari-gradini-cluj-napoca",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "published",
      title: "Publicata",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "h1",
      title: "H1",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "serviceCategory",
      title: "Categorie serviciu",
      type: "reference",
      to: [{ type: "serviceCategory" }],
    }),
    defineField({
      name: "city",
      title: "Localitate",
      type: "reference",
      to: [{ type: "city" }],
    }),
    defineField({
      name: "county",
      title: "Judet",
      type: "reference",
      to: [{ type: "county" }],
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "content",
      title: "Continut editorial",
      type: "portableContent",
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
    defineField({
      name: "internalLinks",
      title: "Linkuri interne",
      type: "array",
      of: [{ type: "internalLink" }],
    }),
    defineField({
      name: "featuredCompanies",
      title: "Firme promovate manual",
      type: "array",
      of: [{ type: "reference", to: [{ type: "company" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});

