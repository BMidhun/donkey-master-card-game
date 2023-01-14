import { useEffect, useState } from "react";
import { IGameState } from "../interface/game";

export default function useGameModals (gameState:IGameState) {

    const [showScoreModal,setShowScoreModal] = useState(false);

    useEffect(() => {
        console.log(gameState);
        if(gameState.numOfAvailablePlayers === 1)
            setShowScoreModal(true);
    },
    [gameState])


    function closeScoreModal() {
        setShowScoreModal(false);
    }


    return {showScoreModal, closeScoreModal}

}