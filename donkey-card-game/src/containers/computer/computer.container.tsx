import { PLAYERS } from "../../enums";
import { ICard } from "../../interface/card";

interface IProps {
    playerCards: ICard[];
    isCurrentPlayer: boolean;
    playerId: PLAYERS
}

function ComputerContainer({playerCards,isCurrentPlayer,playerId}:IProps) {

  return (
    <div>ComputerContainer : Has Ace == {JSON.stringify(isCurrentPlayer)}</div>
  )
}

export default ComputerContainer;