import { defineFunction } from '@aws-amplify/backend';

export const functions = defineFunction({
  name: 'createEntryData', // Correct property name
  handler: 'src/functions/createEntryData.handler',
  environment: {
    TABLE_NAME: process.env.TABLE_NAME,
  },
  permissions: {
    'dynamodb:PutItem': ['arn:aws:dynamodb:region:account-id:table/entrydata'],
  },
});
