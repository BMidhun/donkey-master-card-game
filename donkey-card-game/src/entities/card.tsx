import { ICard } from "../interface/card";
import { getCardRank } from "../utils";

export function createCard (card:ICard):ICard {

    const {type,imgSrc,value} = card;

    return {
        type,
        imgSrc,
        value,
        rank: getCardRank(value)
    }

}