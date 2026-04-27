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
      name: "structuredData",
      title: "Date structurate SEO",
      type: "object",
      description:
        "Campuri optionale folosite doar pentru JSON-LD cand exista date reale.",
      fields: [
        defineField({
          name: "priceRange",
          title: "Interval pret",
          type: "string",
          description: "Ex: $, $$, $$$ sau 'De la 100 lei'.",
        }),
        defineField({
          name: "openingHours",
          title: "Program de lucru",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "dayOfWeek",
                  title: "Zi",
                  type: "string",
                  options: {
                    list: [
                      { title: "Luni", value: "Monday" },
                      { title: "Marti", value: "Tuesday" },
                      { title: "Miercuri", value: "Wednesday" },
                      { title: "Joi", value: "Thursday" },
                      { title: "Vineri", value: "Friday" },
                      { title: "Sambata", value: "Saturday" },
                      { title: "Duminica", value: "Sunday" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "opens",
                  title: "Ora deschidere",
                  type: "string",
                  description: "Format 24h: HH:mm, ex: 09:00.",
                  validation: (Rule) =>
                    Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
                      name: "HH:mm",
                    }),
                }),
                defineField({
                  name: "closes",
                  title: "Ora inchidere",
                  type: "string",
                  description: "Format 24h: HH:mm, ex: 18:00.",
                  validation: (Rule) =>
                    Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
                      name: "HH:mm",
                    }),
                }),
              ],
              preview: {
                select: {
                  day: "dayOfWeek",
                  opens: "opens",
                  closes: "closes",
                },
                prepare({ day, opens, closes }) {
                  return {
                    title: day,
                    subtitle:
                      opens && closes ? `${opens} - ${closes}` : "Incomplet",
                  };
                },
              },
            },
          ],
        }),
        defineField({
          name: "aggregateRating",
          title: "Rating agregat",
          type: "object",
          description:
            "Completeaza doar cand exista review-uri reale, verificabile.",
          fields: [
            defineField({
              name: "ratingValue",
              title: "Rating",
              type: "number",
              validation: (Rule) => Rule.min(1).max(5),
            }),
            defineField({
              name: "reviewCount",
              title: "Numar review-uri",
              type: "number",
              validation: (Rule) => Rule.integer().min(1),
            }),
          ],
        }),
      ],
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
