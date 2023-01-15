import { useEffect, useState } from "react";

const PLAYER_HAND_LENGTH = 13;

export default function usePlayerReady(cb:() => void) {
    const [numOfCardsLoaded,setNumOfCardsLoaded] = useState(0);

    function incrementNumOfCardsLoaded() {
        setNumOfCardsLoaded(prev => prev + 1);
    }

    useEffect(() => {
        if(numOfCardsLoaded === PLAYER_HAND_LENGTH) {
            cb();
        }
    }, [numOfCardsLoaded,cb])


    return {incrementNumOfCardsLoaded};
}