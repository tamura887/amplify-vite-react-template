import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  entrydata: a
    .model({
      tenant_id: a.string(),
      kind: a.string(),
      status: a.string(),
      name: a.string(),
      birth: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
