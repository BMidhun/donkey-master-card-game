import { createCard } from "../entities/card";
import { cardRank } from "../entities/card-rank";
import { cardSet } from "../entities/card-set";
import { CARD_TYPE_ENUM, CARD_VALUES_ENUM, PLAYERS_ENUM } from "../enums";
import { ICard, ICardSet } from "../interface/card";

export function getCardRank(value: CARD_VALUES_ENUM): number {
    return cardRank[value];
}


export async function generateCards() {
    const cardsOfSpade = await generateCardsOfType(CARD_TYPE_ENUM.SPADE);
    const cardsOfClubs = await generateCardsOfType(CARD_TYPE_ENUM.CLUBS);
    const cardsOfHeart = await generateCardsOfType(CARD_TYPE_ENUM.HEART);
    const cardsOfDiamond = await generateCardsOfType(CARD_TYPE_ENUM.DIAMOND);

    return [...cardsOfSpade, ...cardsOfClubs, ...cardsOfDiamond, ...cardsOfHeart];
}


async function generateCardsOfType(type: CARD_TYPE_ENUM): Promise<ICard[]> {
    let cards: ICard[] = [];

    const cardRanks = Object.keys(cardRank);

    for await (let key of cardRanks) {
        const k = (key as unknown) as CARD_VALUES_ENUM;
        const card: ICard = await createCard({
            rank: cardRank[k],
            type,
            value: k,
            imgSrc: await getCardImg(type, k)
        });
        cards.push(card);
    }

    return cards;

}


export async function shuffleCards(): Promise<ICard[]> {
    const arr = (await cardSet).slice();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let j = Math.floor(len * Math.random());
        if (i === j)
            continue;

        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }

    return arr;
}


export function getCardImg(type: CARD_TYPE_ENUM, key: CARD_VALUES_ENUM) {
    try {
        const cardSrcImg = import(`../assets/cards/${type.toLowerCase()}/${type + '_' + key}.svg`);
        return cardSrcImg;
    } catch (error) {
        return '';
    }

}

export function groupCards(playerCards:ICard[]) {
    const cardSet:{
        [CARD_TYPE_ENUM.CLUBS]:ICard[],
        [CARD_TYPE_ENUM.SPADE]:ICard[],
        [CARD_TYPE_ENUM.HEART]:ICard[],
        [CARD_TYPE_ENUM.DIAMOND]:ICard[],
    } = {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    }

    for(let card of playerCards) {
        cardSet[card.type].push(card)
    }

    return cardSet;
}


export function initPlayerCue(cards: ICard[]):PLAYERS_ENUM[] {
    const index = cards.findIndex((card) => card.type === CARD_TYPE_ENUM.SPADE && card.value === CARD_VALUES_ENUM.ACE);
    if (index < 13)
        return [PLAYERS_ENUM.HUMAN,PLAYERS_ENUM.COM1,PLAYERS_ENUM.COM2,PLAYERS_ENUM.COM3];
    else if (index >= 13 && index < 26)
        return [PLAYERS_ENUM.COM1,PLAYERS_ENUM.COM2,PLAYERS_ENUM.COM3,PLAYERS_ENUM.HUMAN];
    else if (index >= 26 && index < 39)
        return [PLAYERS_ENUM.COM2,PLAYERS_ENUM.COM3,PLAYERS_ENUM.HUMAN,PLAYERS_ENUM.COM1];
    else
        return [PLAYERS_ENUM.COM3,PLAYERS_ENUM.HUMAN,PLAYERS_ENUM.COM1,PLAYERS_ENUM.COM2];
}

// If the computer has to start a round
export function selectRandomCard(cardSet:ICardSet):ICard {
    let cards:ICard[] = [];

    for (let key in cardSet) {
        const k = (key as unknown) as CARD_TYPE_ENUM;
        cards = [...cards, ...cardSet[k]]
    }

    const index = Math.floor(cards.length * Math.random());

    return cards[index];
}

// To pick a card of same type
export function selectDealOrHitCard(type:CARD_TYPE_ENUM, cardSet:ICardSet):ICard {
    let cards:ICard[] = cardSet[type];

    if(cards.length === 0)
        return selectRandomCard(cardSet);

    const index = Math.floor(cards.length * Math.random());

    return cards[index];
}