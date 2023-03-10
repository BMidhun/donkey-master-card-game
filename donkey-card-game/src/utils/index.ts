import { createCard } from "../entities/card";
import { cardRank } from "../entities/card-rank";
import { cardSet } from "../entities/card-set";
import { CARD_TYPE_ENUM, CARD_VALUES_ENUM, PLAYERS_ENUM } from "../enums";
import { ICard, ICardSet } from "../interface/card";

export function getCardRank(value: CARD_VALUES_ENUM): number {
    return cardRank[value];
}


export function generateCards() {
    const cardsOfSpade = generateCardsOfType(CARD_TYPE_ENUM.SPADE);
    const cardsOfClubs = generateCardsOfType(CARD_TYPE_ENUM.CLUBS);
    const cardsOfHeart = generateCardsOfType(CARD_TYPE_ENUM.HEART);
    const cardsOfDiamond = generateCardsOfType(CARD_TYPE_ENUM.DIAMOND);

    return [...cardsOfSpade, ...cardsOfClubs, ...cardsOfDiamond, ...cardsOfHeart];
}


function generateCardsOfType(type: CARD_TYPE_ENUM):ICard[] {
    let cards: ICard[] = [];

    const cardRanks = Object.keys(cardRank);

    for  (let key of cardRanks) {
        const k = (key as unknown) as CARD_VALUES_ENUM;
        const card: ICard =  createCard({
            rank: cardRank[k],
            type,
            value: k,
            imgSrc: getCardImg(type, k)
        });
        cards.push(card);
    }

    return cards;

}


export function shuffleCards():ICard[] {
    const arr =  cardSet.slice();
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
        const cardSrcImg = `assets/cards/${type.toLowerCase()}/${type + '_' + key}.png`;
        return cardSrcImg;
    } catch (error) {
        return '';
    }

}

export function groupCards(playerCards:ICard[]) {
    const cardSet:{
        
        [CARD_TYPE_ENUM.SPADE]:ICard[],
        [CARD_TYPE_ENUM.CLUBS]:ICard[],
        [CARD_TYPE_ENUM.HEART]:ICard[],
        [CARD_TYPE_ENUM.DIAMOND]:ICard[],
    } = {
        
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.CLUBS]:[],
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

export function getPlayerColor (player:PLAYERS_ENUM) : string {
    switch(player) {
      
        
        case PLAYERS_ENUM.HUMAN : return "border-lime-600";
        case PLAYERS_ENUM.COM1 : return "border-pink-600";
        case PLAYERS_ENUM.COM2 : return "border-yellow-600";
        case PLAYERS_ENUM.COM3 : return "border-indigo-600";
        default: return ""
    }
}


export function getPlayerShadow (player:PLAYERS_ENUM) : string {
    switch(player) {
      
        
        case PLAYERS_ENUM.HUMAN : return "shadow-lime-600";
        case PLAYERS_ENUM.COM1 : return "shadow-pink-600";
        case PLAYERS_ENUM.COM2 : return "shadow-yellow-600";
        case PLAYERS_ENUM.COM3 : return "shadow-indigo-600";
        default: return ""
    }
}