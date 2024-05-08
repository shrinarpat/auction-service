import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getEndedAuctions = async () => {

    const now = new Date();
    const params = {
        TableName: 'AuctionsTable',
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status AND endingAt <= :now',
        ExpressionAttributeValues: {
            ':status': 'OPEN',
            ':now': now.toISOString()
        },
        ExpressionAttributeNames: {
            '#status': 'status'
        }
    };

    const result = await dynamodb.query(params).promise();
    return result.Items;
};