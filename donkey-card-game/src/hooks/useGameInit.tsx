import { useEffect, useState } from "react";
import { CARD_TYPE_ENUM, PLAYERS_ENUM } from "../enums";
import { ICard } from "../interface/card";
import { IPlayerState } from "../interface/player";
import { groupCards, initPlayerCue, shuffleCards } from "../utils";

const NUM_OF_PLAYERS = 4;


interface IGameState {
    numOfAvailablePlayers: number,
    winners: {
        [PLAYERS_ENUM.HUMAN]:boolean,
        [PLAYERS_ENUM.COM1]: boolean,
        [PLAYERS_ENUM.COM2]: boolean,
        [PLAYERS_ENUM.COM3]: boolean,
    }
}


function useGameInit() {
    useEffect(() => {

        async function init() {
            const cardSet = await shuffleCards();
            setPlayerState(prev => ({
                ...prev,
                [PLAYERS_ENUM.HUMAN]: groupCards(cardSet.slice(0, 13)),
                [PLAYERS_ENUM.COM1]: groupCards(cardSet.slice(13, 26)),
                [PLAYERS_ENUM.COM2]: groupCards(cardSet.slice(26, 39)),
                [PLAYERS_ENUM.COM3]: groupCards(cardSet.slice(39, 52))
            })
            )
            setCurrentPlayOrder(initPlayerCue(cardSet));
        }

        init();

    }, [])

    const [playerState, setPlayerState] = useState<IPlayerState>({
        [PLAYERS_ENUM.HUMAN]: {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    },
        [PLAYERS_ENUM.COM1]: {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    },
        [PLAYERS_ENUM.COM2]: {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    },
        [PLAYERS_ENUM.COM3]: {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    }
    });
    const [currentPlayOrder, setCurrentPlayOrder] = useState<PLAYERS_ENUM[]>([]);
    const [currentPlayerTracker,setCurrentPlayerTracker] = useState(0); 
    const [gameState,setGameState] = useState<IGameState>({
        numOfAvailablePlayers:NUM_OF_PLAYERS,
        winners: {
            [PLAYERS_ENUM.HUMAN]:false,
            [PLAYERS_ENUM.COM1]: false,
            [PLAYERS_ENUM.COM2]: false,
            [PLAYERS_ENUM.COM3]: false,
        }
    });

    function changePlayOrderTracker() {
        setCurrentPlayerTracker(prev => {
            if(prev === currentPlayOrder.length - 1)
                return 0;
            else
                return prev + 1
        })
    }

    function popPlayer(player:PLAYERS_ENUM) {
        setCurrentPlayOrder(prev => prev.filter(val => val !== player));
        setGameState(prev => {
            return {
                ...prev,
                numOfAvailablePlayers: prev.numOfAvailablePlayers - 1,
                winners: {
                    ...prev.winners,
                    [player]: true
                }
            }
        })
    }

    function removeCardOnDeal (player:PLAYERS_ENUM, card:ICard) {
        setPlayerState(prev => ({
            ...prev,
            [player] : {
                ...prev[player],
                [card.type] : prev[player][card.type].filter(_card => _card.value === card.value)
            }
        }))
    }

    function addCardsOnHit(player:PLAYERS_ENUM, cards:ICard[]) {
        const cardSets = {...playerState[player]};
        for(let card of cards) {
            cardSets[card.type] = [...cardSets[card.type], card];
        }

        setPlayerState(prev => ({...prev, [player]: cardSets }));
    }


    return { playerState, currentPlayOrder, changePlayOrderTracker, currentPlayerTracker, popPlayer, removeCardOnDeal, addCardsOnHit };
}

export default useGameInit;