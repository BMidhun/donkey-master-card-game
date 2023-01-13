import { useEffect } from "react";
import PlayerDeckComponent from "../../components/playerDeck.component";
import { PLAYERS_ENUM } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { ITable } from "../../interface/table";
import { selectDealOrHitCard, selectRandomCard } from "../../utils";

interface IProps {
    playerCards: ICardSet;
    isCurrentPlayer: boolean;
    playerId: PLAYERS_ENUM,
    onDeal: (player:PLAYERS_ENUM, card:ICard) => void,
    table:ITable
}


function PlayerContainer({playerCards,isCurrentPlayer,playerId, onDeal,table}:IProps) {
  // useEffect(() => {
  //   if(isCurrentPlayer) {
  //     const card = (table.length === 1 || table.length===0) ? selectRandomCard(playerCards) : selectDealOrHitCard(table[0].card.type, playerCards);
  //     onDeal(playerId,card);
      
  //   }    
  // },[isCurrentPlayer, playerCards, table])
  return (
    <PlayerDeckComponent playerCards={playerCards}/>
  )
}

export default PlayerContainer;