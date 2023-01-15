import { useEffect } from "react";
import { CARD_TYPE_ENUM, PLAYERS_ENUM } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { IGameState } from "../../interface/game";
import { getPlayerColor, selectDealOrHitCard, selectRandomCard } from "../../utils";
import Crown from "../../assets/icons/crown.svg"

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
      setTimeout(() => onDeal(playerId, card) ,2000)
    }    

    else if(isCurrentPlayer && isWinner && !hasGameCompleted) {
       onDeal(playerId, null);
    }

    else if(isCurrentPlayer && isWinner && hasGameCompleted) {
      onDeal(playerId,null)
    }
  },[isCurrentPlayer, playerCards, playCardTypeOnTable, isWinner, hasGameCompleted, onDeal, playerId])

  const highlight = isCurrentPlayer && !isWinner && !hasGameCompleted;

  return (
   <div className={`border-4 rounded-lg border-white-200 bg-none w-full mx-2 h-3/4 md:h-3/5 flex items-center justify-center shadow-md shadow-gray-700 relative ${getPlayerColor(playerId)} ${ highlight ? "animate-pulse": "" }`}>
      <h1 className="text-white">{isWinner ? "WINNER" : `${playerId}`}</h1>
      { isWinner ? <div className='absolute top-0 right-0 h-8 w-8 transform z-40'>
          <img src={Crown}  className='h-full w-full' alt="crown.svg"/>
        </div> : null }
   </div>
  )
}

export default ComputerContainer;