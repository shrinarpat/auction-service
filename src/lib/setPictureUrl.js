import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function setPictureUrl(id, pictureUrl) {

    const updatedAuction = await dynamodb.update({
        TableName: 'AuctionsTable',
        Key: { id },
        UpdateExpression: 'set pictureUrl = :pictureUrl',
        ExpressionAttributeValues: {
            ':pictureUrl': pictureUrl
        },
        ReturnValues: 'ALL_NEW'
    }).promise();

    return updatedAuction;
}
