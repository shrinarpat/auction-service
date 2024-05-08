import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);
  const seller = 'narpatsingh90918@gmail.com';
  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    highestBid: {
      amount: 0
    },
    seller: seller,
    endingAt: endDate.toISOString(),
    createdAt: now.toISOString()
  };

  await dynamodb.put({
    TableName: 'AuctionsTable',
    Item: auction
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;


