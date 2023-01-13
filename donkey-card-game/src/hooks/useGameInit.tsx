import { useEffect, useState } from "react";
import { CARD_TYPE_ENUM, PLAYERS_ENUM } from "../enums";
import { ICard } from "../interface/card";
import { IPlayerState } from "../interface/player";
import { groupCards, initPlayerCue, shuffleCards } from "../utils";

const NUM_OF_PLAYERS = 4;


interface IGameState {
    numOfAvailablePlayers: number,
    winners: PLAYERS_ENUM[];
}


function useGameInit() {
    const [currentPlayOrder, setCurrentPlayOrder] = useState<PLAYERS_ENUM[]>([]);
    const [currentPlayerTracker, setCurrentPlayerTracker] = useState(0);
    const [gameState, setGameState] = useState<IGameState>({
        numOfAvailablePlayers: NUM_OF_PLAYERS,
        winners: []
    });

    const [playerState, setPlayerState] = useState<IPlayerState>({
        [PLAYERS_ENUM.HUMAN]: {
            [CARD_TYPE_ENUM.SPADE]: [],
            [CARD_TYPE_ENUM.CLUBS]: [],
            [CARD_TYPE_ENUM.HEART]: [],
            [CARD_TYPE_ENUM.DIAMOND]: [],
        },
        [PLAYERS_ENUM.COM1]: {
            [CARD_TYPE_ENUM.CLUBS]: [],
            [CARD_TYPE_ENUM.SPADE]: [],
            [CARD_TYPE_ENUM.HEART]: [],
            [CARD_TYPE_ENUM.DIAMOND]: [],
        },
        [PLAYERS_ENUM.COM2]: {
            [CARD_TYPE_ENUM.CLUBS]: [],
            [CARD_TYPE_ENUM.SPADE]: [],
            [CARD_TYPE_ENUM.HEART]: [],
            [CARD_TYPE_ENUM.DIAMOND]: [],
        },
        [PLAYERS_ENUM.COM3]: {
            [CARD_TYPE_ENUM.CLUBS]: [],
            [CARD_TYPE_ENUM.SPADE]: [],
            [CARD_TYPE_ENUM.HEART]: [],
            [CARD_TYPE_ENUM.DIAMOND]: [],
        }
    });

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
 

    function changePlayOrderTracker(newRoundPlayer?: PLAYERS_ENUM) {


        if (newRoundPlayer) {
            const index = currentPlayOrder.indexOf(newRoundPlayer);
            if (index)
                setCurrentPlayerTracker(index);
            return;
        }

        setCurrentPlayerTracker(prev => {
            if (prev === currentPlayOrder.length - 1)
                return 0;
            else
                return prev + 1
        });

        return;

    }

    function popPlayer(player: PLAYERS_ENUM) {
        const indexOfPlayer = currentPlayOrder.indexOf(player);
        let indexOfNextPlayer= indexOfPlayer === currentPlayOrder.length - 1 ? 0 : indexOfPlayer + 1;
        
        setCurrentPlayOrder(prev => prev.filter(val => val !== player));
        setCurrentPlayerTracker(indexOfNextPlayer);
        setGameState(prev => {
            return {
                ...prev,
                numOfAvailablePlayers: prev.numOfAvailablePlayers - 1,
                winners: [...prev.winners, player]
            }
        })
    }

    function removeCardOnDeal(player: PLAYERS_ENUM, card: ICard) {
        setPlayerState(prev => ({
            ...prev,
            [player]: {
                ...prev[player],
                [card.type]: prev[player][card.type].filter(_card => _card.value === card.value)
            }
        }))
    }

    function addCardsOnHit(player: PLAYERS_ENUM, cards: ICard[]) {
        const cardSets = { ...playerState[player] };
        for (let card of cards) {
            cardSets[card.type] = [...cardSets[card.type], card];
        }

        setPlayerState(prev => ({ ...prev, [player]: cardSets }));
    }

    useEffect(() => {
        if(currentPlayOrder.length) {
            checkWinner();
        }
    },[playerState, currentPlayOrder])

    function checkWinner() {
        const state = {...playerState};
        for(let player of Object.keys(state)) {
            const key = (player as unknown) as PLAYERS_ENUM;
            if(state[key][CARD_TYPE_ENUM.CLUBS].length === 0 &&
                state[key][CARD_TYPE_ENUM.DIAMOND].length === 0 &&
                state[key][CARD_TYPE_ENUM.HEART].length === 0 &&
                state[key][CARD_TYPE_ENUM.SPADE].length === 0
             )
             {
                popPlayer(key);
             }
        }
    }


    return { playerState, currentPlayOrder, changePlayOrderTracker, currentPlayerTracker, popPlayer, removeCardOnDeal, addCardsOnHit, gameState };
}

export default useGameInit;