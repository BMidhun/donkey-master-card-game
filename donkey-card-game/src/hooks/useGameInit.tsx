import { useEffect, useState } from "react";
import { PLAYERS } from "../enums";
import { ICard } from "../interface/card";
import { initPlayerCue, shuffleCards } from "../utils";


function useGameInit() {
    useEffect(() => {

        async function init() {
           const cardSet = await shuffleCards();
           setCards(cards);
           setCurrentPlayer(initPlayerCue(cardSet));
        }
    
        init();
    
      },[])
    
      const [cards,setCards] = useState<ICard[]>([]);
      const [currentPlayer,setCurrentPlayer] = useState<PLAYERS>(PLAYERS.HUMAN);

      return {cards,currentPlayer,setCurrentPlayer};
}

export default useGameInit;