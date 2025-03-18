import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  entrydata: a
    .model({
      tenant_id: a.string().required(),
      tran_id: a.id().required(),
      kind: a.string(),
      status: a.string(),
      name: a.string(),
      birth: a.string(),
      createdAt: a.timestamp(), // 自動生成される作成日時フィールド
      updatedAt: a.timestamp(), // 自動生成される更新日時フィールド
    })
    .identifier(["tenant_id", "tran_id"])
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {},
  },
});
