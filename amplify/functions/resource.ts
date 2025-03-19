import { defineFunction } from '@aws-amplify/backend';

export const functions = defineFunction({
  name: 'createEntryData', // Correct property name
  entry: 'src/functions/createEntryData.ts',
  environment: {
    TABLE_NAME: process.env.TABLE_NAME || 'entrydata',
  },
  
});
