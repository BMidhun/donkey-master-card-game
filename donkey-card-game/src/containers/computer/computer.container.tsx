import { useEffect } from "react";
import { PLAYERS_ENUM } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { ITable } from "../../interface/table";

interface IProps {
    playerCards: ICardSet;
    isCurrentPlayer: boolean;
    playerId: PLAYERS_ENUM,
    onDeal: (player:PLAYERS_ENUM, card:ICard) => void
    table:ITable
}

function selectRandomCard(cards:ICard[]) {
    const index = Math.floor(cards.length * Math.random());
    return cards[index];
 }
 

function ComputerContainer({playerCards,isCurrentPlayer,playerId,onDeal}:IProps) {

  return (
    <div>ComputerContainer : Has Ace == {JSON.stringify(isCurrentPlayer)}</div>
  )
}

export default ComputerContainer;