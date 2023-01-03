import { PLAYERS } from "../../enums";
import { ICard } from "../../interface/card";

interface IProps {
    playerCards: ICard[];
    isCurrentPlayer: boolean;
    playerId: PLAYERS
}

function PlayerContainer({playerCards,isCurrentPlayer,playerId}:IProps) {

  return (
    <div>PlayerContainer : Has Ace == {JSON.stringify(isCurrentPlayer)}</div>
  )
}

export default PlayerContainer;