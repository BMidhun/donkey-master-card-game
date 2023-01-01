import { createCard } from "../entities/card";
import { cardRank } from "../entities/card-rank";
import { CARD_TYPE_ENUM, CARD_VALUES_ENUM } from "../enums";
import { ICard } from "../interface/card";

export function getCardRank(value:CARD_VALUES_ENUM):number {
    return cardRank[value];
}


export function generateCards() {
    const cardsOfSpade = generateCardsOfType(CARD_TYPE_ENUM.SPADE);
    const cardsOfClaver = generateCardsOfType(CARD_TYPE_ENUM.CLAVER);
    const cardsOfHeart = generateCardsOfType(CARD_TYPE_ENUM.HEART);
    const cardsOfDiamond = generateCardsOfType(CARD_TYPE_ENUM.DIAMOND);

    return [...cardsOfSpade,...cardsOfClaver,...cardsOfDiamond, ...cardsOfHeart];
}


function generateCardsOfType(type:CARD_TYPE_ENUM) {
    const cards:ICard[] = [];

    Object.keys(cardRank).forEach((key) => {
        const k = (key as unknown) as CARD_VALUES_ENUM;
        const card:ICard = createCard({
            rank: cardRank[k],
            type,
            value: k
        });
        cards.push(card);
    })

    return cards;
}