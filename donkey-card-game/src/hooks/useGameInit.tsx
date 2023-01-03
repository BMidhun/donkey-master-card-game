import { useEffect, useState } from "react";
import { PLAYERS } from "../enums";
import { ICard } from "../interface/card";
import { IPlayer } from "../interface/player";
import { initPlayerCue, shuffleCards } from "../utils";


function useGameInit() {
    useEffect(() => {

        async function init() {
            const cardSet = await shuffleCards();
            setGameState(prev => {
                return [
                    {
                        playerHand: cardSet.slice(0, 13),
                        type: PLAYERS.HUMAN
                    },
                    {
                        playerHand: cardSet.slice(13, 26),
                        type: PLAYERS.COM1
                    },
                    {
                        playerHand: cardSet.slice(26, 39),
                        type: PLAYERS.COM2
                    },
                    {
                        playerHand: cardSet.slice(39, 52),
                        type: PLAYERS.COM3
                    }
                ]
            })
            setCurrentPlayer(initPlayerCue(cardSet));
        }

        init();

    }, [])

    const [gameState, setGameState] = useState<IPlayer[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<PLAYERS>(PLAYERS.HUMAN);

    return { gameState, currentPlayer, setCurrentPlayer };
}

export default useGameInit;