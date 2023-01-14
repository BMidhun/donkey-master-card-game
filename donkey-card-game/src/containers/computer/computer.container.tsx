import { useEffect } from "react";
import { CARD_TYPE_ENUM, PLAYERS_ENUM } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { IGameState } from "../../interface/game";
import { ITable } from "../../interface/table";
import { getPlayerColor, selectDealOrHitCard, selectRandomCard } from "../../utils";

interface IProps {
    playerCards: ICardSet;
    isCurrentPlayer: boolean;
    playerId: PLAYERS_ENUM,
    onDeal: (player:PLAYERS_ENUM, card:ICard | null) => void
    playCardTypeOnTable: CARD_TYPE_ENUM;
    gameState: IGameState
}



function ComputerContainer({playerCards,isCurrentPlayer,playerId,onDeal,playCardTypeOnTable,gameState}:IProps) {

  const hasGameCompleted = gameState.numOfAvailablePlayers === 1;
  const isWinner = gameState.winners[playerId];

  useEffect(() => {

    if(hasGameCompleted)
      return;

    if(isCurrentPlayer && !isWinner && !hasGameCompleted) {
      const card = !playCardTypeOnTable ? selectRandomCard(playerCards) : selectDealOrHitCard(playCardTypeOnTable, playerCards);
     
      // setTimeout(() => onDeal(playerId, card) ,3000)
      onDeal(playerId, card)
    }    

    else if(isCurrentPlayer && isWinner && !hasGameCompleted) {
       onDeal(playerId, null);
    }

    else if(isCurrentPlayer && isWinner && hasGameCompleted) {
      onDeal(playerId,null)
    }
  },[isCurrentPlayer, playerCards, playCardTypeOnTable, isWinner, hasGameCompleted])

  const highlight = isCurrentPlayer && !isWinner && !hasGameCompleted;

  return (
   <div className={`border-4 border-white-200 bg-none w-full mx-2 h-3/5 flex items-center justify-center shadow shadow-orange-500 ${getPlayerColor(playerId)} ${ highlight ? "animate-pulse": "" }`}>
      <h1 className="text-white">{isWinner ? "WINNER" : `COM: ${playerId}`}</h1>
   </div>
  )
}

export default ComputerContainer;