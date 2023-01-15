import { CARD_TYPE_ENUM, CARD_VALUES_ENUM } from "../enums";

export interface ICard {
    type: CARD_TYPE_ENUM,
    imgSrc?: string,
    value: CARD_VALUES_ENUM,
    rank: number
}


export interface ICardSet {
    [CARD_TYPE_ENUM.SPADE]:ICard[],
    [CARD_TYPE_ENUM.CLUBS]:ICard[],
    [CARD_TYPE_ENUM.HEART]:ICard[],
    [CARD_TYPE_ENUM.DIAMOND]:ICard[],
}