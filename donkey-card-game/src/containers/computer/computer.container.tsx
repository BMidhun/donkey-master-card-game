import { useEffect } from "react";
import { PLAYERS_ENUM } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { ITable } from "../../interface/table";
import { getPlayerColor, selectDealOrHitCard, selectRandomCard } from "../../utils";

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
  //     onDeal(playerId,card)
      
  //   }    
  // },[isCurrentPlayer, playerCards])

  return (
   <div className={`border-4 border-white-200 bg-none w-full mx-2 h-3/5 flex items-center justify-center shadow shadow-orange-500 ${getPlayerColor(playerId)}`}>
      <h1 className="text-white">COM: {playerId}</h1>
   </div>
  )
}

export default ComputerContainer;