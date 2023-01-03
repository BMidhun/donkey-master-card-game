import { useEffect, useState } from "react";
import { PLAYERS } from "../enums";
import { ICard } from "../interface/card";
import { initPlayerCue, shuffleCards } from "../utils";

const NUM_OF_PLAYERS = 4;
interface IPlayerState {
    [PLAYERS.HUMAN]: ICard[],
    [PLAYERS.COM1]: ICard[],
    [PLAYERS.COM2]: ICard[],
    [PLAYERS.COM3]: ICard[]
}

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
                [PLAYERS.HUMAN]: cardSet.slice(0, 13),
                [PLAYERS.COM1]: cardSet.slice(13, 26),
                [PLAYERS.COM2]: cardSet.slice(26, 39),
                [PLAYERS.COM3]: cardSet.slice(39, 52)
            })
            )
            setCurrentPlayers(initPlayerCue(cardSet));
        }

        init();

    }, [])

    const [playerState, setPlayerState] = useState<IPlayerState>({
        [PLAYERS.HUMAN]: [],
        [PLAYERS.COM1]: [],
        [PLAYERS.COM2]: [],
        [PLAYERS.COM3]: []
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