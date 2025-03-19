import { defineFunction } from '@aws-amplify/backend';

export const functions = defineFunction({
  functionName: 'createEntryData', // Correct property name
  handler: 'src/functions/createEntryData.handler',
  environment: {
    TABLE_NAME: process.env.TABLE_NAME || 'entrydata',
  },
  permissions: {
    'dynamodb:PutItem': ['arn:aws:dynamodb:region:account-id:table/entrydata'],
  },
});
