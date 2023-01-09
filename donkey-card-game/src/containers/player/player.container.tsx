import { PLAYERS } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { ITable } from "../../interface/table";

interface IProps {
    playerCards: ICardSet;
    isCurrentPlayer: boolean;
    playerId: PLAYERS,
    onDeal: (player:PLAYERS, card:ICard) => void,
    table:ITable
}

function selectRandomCard(cards:ICard[]) {
   const index = Math.floor(cards.length * Math.random());
   return cards[index];
}

function PlayerContainer({playerCards,isCurrentPlayer,playerId, onDeal}:IProps) {
  return (
    <div>PlayerContainer : Has Ace == {JSON.stringify(isCurrentPlayer)}</div>
  )
}

export default PlayerContainer;