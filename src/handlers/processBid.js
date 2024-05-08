import { closeAuction } from "../lib/closeAuction";
import { getEndedAuctions } from "../lib/getEndedAuctions";
async function processBid(event, context) {
    try {
        const auctionsToClose = await getEndedAuctions();
        const closePromises = auctionsToClose.map(auction => closeAuction(auction));
        await Promise.all(closePromises);

        return { closed: closePromises?.length};
    } catch(error){
        console.log(error);
    }
}

export const handler = processBid;