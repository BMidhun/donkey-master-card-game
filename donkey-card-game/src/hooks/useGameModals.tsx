import { useEffect, useState } from "react";
import { IGameState } from "../interface/game";

export default function useGameModals (gameState:IGameState) {

    const [showScoreModal,setShowScoreModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);

    useEffect(() => {
        console.log(gameState);
        if(gameState.numOfAvailablePlayers === 1)
            setShowScoreModal(true);
    },
    [gameState])


    function closeScoreModal() {
        setShowScoreModal(false);
    }

    function openInfoModal() {
        setShowInfoModal(true);
    }

    function closeInfoModal() {
        setShowInfoModal(false);
    }


    return {showScoreModal, closeScoreModal,openInfoModal, closeInfoModal, showInfoModal}

}