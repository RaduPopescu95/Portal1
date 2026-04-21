import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { deskStructure } from "./sanity/structure";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missingprojectid";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "firmeAmenajariGradini",
  title: "Firme Amenajari Gradini",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
