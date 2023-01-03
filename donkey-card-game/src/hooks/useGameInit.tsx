import { useEffect, useState } from "react";
import { PLAYERS } from "../enums";
import { ICard } from "../interface/card";
import { initPlayerCue, shuffleCards } from "../utils";

interface IGameState {
    [PLAYERS.HUMAN]: ICard[],
    [PLAYERS.COM1]: ICard[],
    [PLAYERS.COM2]: ICard[],
    [PLAYERS.COM3]: ICard[]
}


function useGameInit() {
    useEffect(() => {

        async function init() {
            const cardSet = await shuffleCards();
            setGameState(prev => ({
                ...prev,
                [PLAYERS.HUMAN]: cardSet.slice(0, 13),
                [PLAYERS.COM1]: cardSet.slice(13, 26),
                [PLAYERS.COM2]: cardSet.slice(26, 39),
                [PLAYERS.COM3]: cardSet.slice(39, 52)
            })
            )
            setCurrentPlayer(initPlayerCue(cardSet));
        }

        init();

    }, [])

    const [gameState, setGameState] = useState<IGameState>({
        [PLAYERS.HUMAN]: [],
        [PLAYERS.COM1]: [],
        [PLAYERS.COM2]: [],
        [PLAYERS.COM3]: []
    });
    const [currentPlayer, setCurrentPlayer] = useState<PLAYERS>(PLAYERS.HUMAN);

    return { gameState, currentPlayer, setCurrentPlayer };
}

export default useGameInit;