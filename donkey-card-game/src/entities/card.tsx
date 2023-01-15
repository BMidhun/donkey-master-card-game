import { ICard } from "../interface/card";
import { getCardRank } from "../utils";

export async function createCard (card:ICard):Promise<ICard> {

    const {type,imgSrc,value} = card;

    return {
        type,
        imgSrc,
        value,
        rank: getCardRank(value)
    }

}