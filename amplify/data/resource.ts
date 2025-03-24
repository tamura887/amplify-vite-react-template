import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Entrydata: a
    .model({
      tenant_id: a.string().required(),
      tran_id: a.id().required(),
      ppid: a.string(),
      kind: a.string(),
      status: a.string(),
      name: a.string(),
      name_kana: a.string(),
      birth: a.string(),
      gender: a.string(),
      zipcode: a.string(),
      address: a.string(),
      address_kana: a.string(),
      phone_mobile: a.string(),
      phone_home: a.string(),
      phone_mobile_new: a.string(),
      phone_home_new: a.string(),
      email: a.string(),
      nationality: a.string(),
      residential_status: a.string(),
      expiration_date: a.string(),
      purpose: a.string(),
      shop_kind: a.string(),
      shop_name: a.string(),
      shop_code: a.string(),
      account_number: a.string(),
      account_kind: a.string(),
      change_address: a.string(),
      change_phone: a.string(),
      my_number: a.string(),
      card_pin: a.string(),
      passbook: a.string(),
      job: a.string(),
      industry: a.string(),
      office_name: a.string(),
      office_kana: a.string(),
      office_phone: a.string(),
      business_details: a.string(),
      foreign_trade: a.string(),
      foreign_assets: a.string(),
      foreign_details: a.string(),
      comment: a.string(),
      verifiedAt: a.datetime(),
      registeredAt: a.datetime(),
      expiredAt: a.datetime(),
    })
    .identifier(['tenant_id', 'tran_id'])
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {},
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>

