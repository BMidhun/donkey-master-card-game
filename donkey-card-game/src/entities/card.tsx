import { CARD_TYPE_ENUM, CARD_VALUES_ENUM } from "../enums"
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