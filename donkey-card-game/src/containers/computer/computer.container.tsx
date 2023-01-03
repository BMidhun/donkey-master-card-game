import { useEffect } from "react";
import { PLAYERS } from "../../enums";
import { ICard } from "../../interface/card";
import { ITable } from "../../interface/table";

interface IProps {
    playerCards: ICard[];
    isCurrentPlayer: boolean;
    playerId: PLAYERS,
    onDeal: (player:PLAYERS, card:ICard) => void
    table:ITable
}

function selectRandomCard(cards:ICard[]) {
    const index = Math.floor(cards.length * Math.random());
    return cards[index];
 }
 

function ComputerContainer({playerCards,isCurrentPlayer,playerId,onDeal}:IProps) {
    useEffect(() => {
        if(isCurrentPlayer)
            onDeal(playerId, selectRandomCard(playerCards))
     },[isCurrentPlayer,playerCards,playerId])
  return (
    <div>ComputerContainer : Has Ace == {JSON.stringify(isCurrentPlayer)}</div>
  )
}

export default ComputerContainer;