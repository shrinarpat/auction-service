import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
    const { id } = event.pathParameters; 
    console.log('event', event);
    const { amount } = JSON.parse(event.body);
    console.log('parse body: ', JSON.parse(event.body));
    const bidder = 'narpatsinghrawat8@gmail.com';
    const params = {
        TableName: 'AuctionsTable',
        Key: { id },
        UpdateExpression: 'set highestBid.amount = :amount, highestBid.bidder = :bidder',
        ExpressionAttributeValues: {
            ':amount': amount,
            ':bidder': bidder,
        },
        ReturnValues: 'ALL_NEW'
    };

    let updatedAuction;

    try {

        const result = await dynamodb.update(params).promise()
        updatedAuction = result.Attributes

        return {
            statusCode: 200,
            body: JSON.stringify(updatedAuction)
        }

    } catch(error) {
        console.log(error)
    }
}

export const handler = placeBid