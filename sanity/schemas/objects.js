import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      validation: (Rule) => Rule.max(60).warning("Recomandat: 30-60 caractere"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning("Recomandat: 120-160 caractere"),
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL/path",
      type: "string",
      description: "Optional. Ex: /amenajari-gradini-cluj-napoca",
    }),
    defineField({
      name: "noIndex",
      title: "Noindex",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "socialImage",
      title: "Open Graph image",
      type: "imageWithAlt",
    }),
  ],
});

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Imagine cu alt text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Imagine",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text SEO",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(125).warning("Recomandat sub 125 caractere"),
    }),
    defineField({
      name: "caption",
      title: "Descriere/caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
  },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Intrebare",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Raspuns",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const internalLink = defineType({
  name: "internalLink",
  title: "Link intern",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "path",
      title: "Path",
      type: "string",
      description: "Ex: /judet/cluj sau /amenajari-gradini-cluj-napoca",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const portableContent = defineType({
  name: "portableContent",
  title: "Continut editorial",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "imageWithAlt" }),
  ],
});

