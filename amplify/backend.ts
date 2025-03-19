import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { functions } from './functions/resource'; // Add this line

defineBackend({
  auth,
  data,
  functions, // Add this line
});
