import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

exports.handler = async (event: any) => {
  const { tenant_id } = event.arguments;

  const tran_id = generateUniqueId(); // Implement this function to generate a unique ID

  const newItem = {
    tenant_id,
    tran_id,
    kind: '',
    status: '',
    name: '',
    birth: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await dynamoDb.put({
    TableName: process.env.TABLE_NAME!,
    Item: newItem,
  }).promise();

  return newItem;
};

function generateUniqueId() {
  // Implement your unique ID generation logic here
  return 'unique-id';
}
