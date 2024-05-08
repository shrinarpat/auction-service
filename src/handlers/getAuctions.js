import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
    let auctions;
    const { status } = event.queryStringParameters;
    try {
        const params = {
            TableName: 'AuctionsTable',
            IndexName: 'statusAndEndDate',
            KeyConditionExpression: '#status = :status',
            ExpressionAttributeValues: {
                ':status': status
            },
            ExpressionAttributeNames: {
                '#status': 'status'
            }
        };
        const result = await dynamodb.query(params).promise();
        auctions = result.Items;

        return {
            statusCode: 200,
            body: JSON.stringify(auctions)
        };

    } catch(error){
        console.log(error);
        throw new Error('Oops something went wrong!');
    }
}

export const handler = getAuctions;