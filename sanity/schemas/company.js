import { defineField, defineType } from "sanity";

export const company = defineType({
  name: "company",
  title: "Firma",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume firma",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug /firma/[slug]",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "published",
      title: "Publicata",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "serviceCategory",
      title: "Categorie principala",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Servicii secundare",
      type: "array",
      of: [{ type: "reference", to: [{ type: "serviceCategory" }] }],
    }),
    defineField({
      name: "county",
      title: "Judet",
      type: "reference",
      to: [{ type: "county" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "Localitate",
      type: "reference",
      to: [{ type: "city" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adresa",
      type: "string",
    }),
    defineField({
      name: "postalCode",
      title: "Cod postal",
      type: "string",
    }),
    defineField({
      name: "coordinates",
      title: "Coordonate",
      type: "geopoint",
    }),
    defineField({
      name: "phonePrimary",
      title: "Telefon 1",
      type: "string",
    }),
    defineField({
      name: "phoneSecondary",
      title: "Telefon 2",
      type: "string",
    }),
    defineField({
      name: "emailPrimary",
      title: "Email 1",
      type: "email",
    }),
    defineField({
      name: "emailSecondary",
      title: "Email 2",
      type: "email",
    }),
    defineField({
      name: "websitePrimary",
      title: "Website 1",
      type: "url",
    }),
    defineField({
      name: "websiteSecondary",
      title: "Website 2",
      type: "url",
    }),
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
    }),
    defineField({
      name: "googleBusinessUrl",
      title: "Google Business Profile",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
    }),
    defineField({
      name: "gallery",
      title: "Galerie foto",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: "description",
      title: "Descriere firma",
      type: "portableContent",
    }),
    defineField({
      name: "shortDescription",
      title: "Descriere scurta",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "city.name",
      media: "logo.image",
    },
  },
});

