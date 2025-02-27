export default {
  dialect: "postgresql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",

  dbCredentials: {
    url: "postgresql://content_owner:npg_kaUB9O1KGwxq@ep-steep-fog-a9mmuisa-pooler.gwc.azure.neon.tech/content?sslmode=require",
    connectionString:
      "postgresql://content_owner:npg_kaUB9O1KGwxq@ep-steep-fog-a9mmuisa-pooler.gwc.azure.neon.tech/content?sslmode=require",
  },
};
