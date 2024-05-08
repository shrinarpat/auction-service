import { getAuction } from './getAuction';
import { uploadPictureToS3 } from '../lib/uploadPictureToS3';
import { setPictureUrl } from '../lib/setPictureUrl';

export async function uploadAuctionPicture(event, context) {
    console.log(event);
    const { id } = event.pathParameters;
    await getAuction({pathParameters: {id}});
    const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    let updatedAuction;

    try {
        const pictureUrl = await uploadPictureToS3(`${id}.jpg`, buffer);
        console.log(pictureUrl);
        updatedAuction = await setPictureUrl(id, pictureUrl);
    } catch(error) {
        console.log(error);
        throw new Error('Something went wrong!');
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAuction)
    };
}

export const handler = uploadAuctionPicture;