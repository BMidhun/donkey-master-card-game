import { useEffect } from "react";
import { PLAYERS_ENUM } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { ITable } from "../../interface/table";
import { selectDealOrHitCard, selectRandomCard } from "../../utils";

interface IProps {
    playerCards: ICardSet;
    isCurrentPlayer: boolean;
    playerId: PLAYERS_ENUM,
    onDeal: (player:PLAYERS_ENUM, card:ICard) => void
    table:ITable
}



function ComputerContainer({playerCards,isCurrentPlayer,playerId,onDeal,table}:IProps) {

  // useEffect(() => {
  //   if(isCurrentPlayer) {
  //     const card = (table.length === 1 || table.length === 0) ? selectRandomCard(playerCards) : selectDealOrHitCard(table[0].card.type, playerCards);
  //     setTimeout(() => {onDeal(playerId,card);}, 3000)
      
  //   }    
  // },[isCurrentPlayer, playerCards])

  return (
   <div></div>
  )
}

export default ComputerContainer;