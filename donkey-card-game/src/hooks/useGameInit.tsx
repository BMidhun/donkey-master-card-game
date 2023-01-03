import { useEffect, useState } from "react";
import { CARD_TYPE_ENUM, PLAYERS } from "../enums";
import { ICard } from "../interface/card";
import { IPlayerState } from "../interface/player";
import { groupCards, initPlayerCue, shuffleCards } from "../utils";

const NUM_OF_PLAYERS = 4;


interface IGameState {
    numOfAvailablePlayers: number,
    winners: {
        [PLAYERS.HUMAN]:boolean,
        [PLAYERS.COM1]: boolean,
        [PLAYERS.COM2]: boolean,
        [PLAYERS.COM3]: boolean,
    }
}


function useGameInit() {
    useEffect(() => {

        async function init() {
            const cardSet = await shuffleCards();
            setPlayerState(prev => ({
                ...prev,
                [PLAYERS.HUMAN]: groupCards(cardSet.slice(0, 13)),
                [PLAYERS.COM1]: groupCards(cardSet.slice(13, 26)),
                [PLAYERS.COM2]: groupCards(cardSet.slice(26, 39)),
                [PLAYERS.COM3]: groupCards(cardSet.slice(39, 52))
            })
            )
            setCurrentPlayers(initPlayerCue(cardSet));
        }

        init();

    }, [])

    const [playerState, setPlayerState] = useState<IPlayerState>({
        [PLAYERS.HUMAN]: {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    },
        [PLAYERS.COM1]: {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    },
        [PLAYERS.COM2]: {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    },
        [PLAYERS.COM3]: {
        [CARD_TYPE_ENUM.CLUBS]:[],
        [CARD_TYPE_ENUM.SPADE]:[],
        [CARD_TYPE_ENUM.HEART]:[],
        [CARD_TYPE_ENUM.DIAMOND]:[],
    }
    });
    const [currentPlayers, setCurrentPlayers] = useState<PLAYERS[]>([]);
    const [currentPlayerTracker,setCurrentPlayerTracker] = useState(0); 
    const [gameState,setGameState] = useState<IGameState>({
        numOfAvailablePlayers:NUM_OF_PLAYERS,
        winners: {
            [PLAYERS.HUMAN]:false,
            [PLAYERS.COM1]: false,
            [PLAYERS.COM2]: false,
            [PLAYERS.COM3]: false,
        }
    });

    return { playerState, currentPlayers, setCurrentPlayers,setCurrentPlayerTracker, currentPlayerTracker };
}

export default useGameInit;