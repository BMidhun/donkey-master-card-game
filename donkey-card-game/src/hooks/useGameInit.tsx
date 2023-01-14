import { useEffect, useState } from "react";
import { CARD_TYPE_ENUM, PLAYERS_ENUM } from "../enums";
import { ICard } from "../interface/card";
import { IGameState } from "../interface/game";
import { IPlayerState } from "../interface/player";
import { groupCards, initPlayerCue, shuffleCards } from "../utils";

const NUM_OF_PLAYERS = 4;





function useGameInit() {
    const [currentPlayOrder, setCurrentPlayOrder] = useState<PLAYERS_ENUM[]>([]);
    const [currentPlayerTracker, setCurrentPlayerTracker] = useState(0);
    const [gameState, setGameState] = useState<IGameState>({
        numOfAvailablePlayers: NUM_OF_PLAYERS,
        winners: {
            [PLAYERS_ENUM.HUMAN] : false,
        [PLAYERS_ENUM.COM1] : false,
        [PLAYERS_ENUM.COM2] : false,
        [PLAYERS_ENUM.COM3] : false,
        }
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
 

    function changePlayOrderTracker(player: PLAYERS_ENUM | false) {
        if(player === false) {
            setCurrentPlayerTracker(-1);
            return;
        }
          
        const index = currentPlayOrder.indexOf(player);

        setCurrentPlayerTracker(index);
    }

    function popPlayer(winners: PLAYERS_ENUM[]) {
        // const indexOfPlayer = currentPlayOrder.indexOf(player);
        // let indexOfNextPlayer= indexOfPlayer === currentPlayOrder.length - 1 ? 0 : indexOfPlayer + 1;
        
        // setCurrentPlayOrder(prev => prev.filter(val => val !== player));
        // setCurrentPlayerTracker(indexOfNextPlayer);

        const newWinners = {...gameState.winners};

        for(let player of winners) {
            const k = (player as unknown) as PLAYERS_ENUM;
            newWinners[k] = true;
        }

        setGameState(prev => {
            return {
                numOfAvailablePlayers: NUM_OF_PLAYERS - winners.length,
                winners: newWinners
            }
        })
    }

    function removeCardOnDeal(player: PLAYERS_ENUM, card: ICard) {
        setPlayerState(prev => ({
            ...prev,
            [player]: {
                ...prev[player],
                [card.type]: prev[player][card.type].filter(_card => _card.value !== card.value)
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
        // console.log("PLAYER STATE::", gameState)
        if(gameState.numOfAvailablePlayers === 1) {
             window.alert("Game complete")
        }
    },[gameState])

    function checkWinner() {
        const state = {...playerState};
        let winners = [];
        for(let player of Object.keys(state)) {
            const key = (player as unknown) as PLAYERS_ENUM;
            if(state[key][CARD_TYPE_ENUM.CLUBS].length === 0 &&
                state[key][CARD_TYPE_ENUM.DIAMOND].length === 0 &&
                state[key][CARD_TYPE_ENUM.HEART].length === 0 &&
                state[key][CARD_TYPE_ENUM.SPADE].length === 0
             )
             {
                winners.push(key);
             }
        }

        popPlayer(winners);
    }


    return { playerState, currentPlayOrder, changePlayOrderTracker, currentPlayerTracker, popPlayer, removeCardOnDeal, addCardsOnHit, gameState, checkWinner };
}

export default useGameInit;