import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getAuction(event, context) {
    const { id } = event.pathParameters;
    let auction;
    try {

        const result  = await dynamodb.get({
            TableName: 'AuctionsTable',
            Key: { id }
        }).promise();
        auction = result.Item;

        return {
            statusCode: 200,
            body: JSON.stringify(auction)
        };

    } catch(error){
        console.log(error);
        throw new Error('Oops something went wrong!');
    }
}

export const handler = getAuction;