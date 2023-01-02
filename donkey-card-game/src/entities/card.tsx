import { CARD_TYPE_ENUM, CARD_VALUES_ENUM } from "../enums"
import { ICard } from "../interface/card";
import { getCardRank } from "../utils";

interface ICardProps {
    type: CARD_TYPE_ENUM
    imgSrc?: string
    value: CARD_VALUES_ENUM,
    rank: number
}

export async function createCard (card:ICardProps):Promise<ICard> {

    const {type,imgSrc,value} = card;

    return {
        type,
        imgSrc,
        value,
        rank: getCardRank(value)
    }

}