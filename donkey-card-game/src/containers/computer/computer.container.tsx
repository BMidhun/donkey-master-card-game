import { useEffect } from "react";
import { ComputerDeckComponent } from "../../components";
import { CARD_TYPE_ENUM, PLAYERS_ENUM } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { IGameState } from "../../interface/game";
import {
  selectDealOrHitCard,
  selectRandomCard,
} from "../../utils";

interface IProps {
  playerCards: ICardSet;
  isCurrentPlayer: boolean;
  playerId: PLAYERS_ENUM;
  onDeal: (player: PLAYERS_ENUM, card: ICard | null) => void;
  playCardTypeOnTable: CARD_TYPE_ENUM;
  gameState: IGameState;
}

function ComputerContainer({
  playerCards,
  isCurrentPlayer,
  playerId,
  onDeal,
  playCardTypeOnTable,
  gameState,
}: IProps) {
  const hasGameCompleted = gameState.numOfAvailablePlayers === 1;
  const isWinner = gameState.winners[playerId];

  useEffect(() => {
    if (hasGameCompleted) return;

    if (isCurrentPlayer && !isWinner && !hasGameCompleted) {
      const card = !playCardTypeOnTable
        ? selectRandomCard(playerCards)
        : selectDealOrHitCard(playCardTypeOnTable, playerCards);
      setTimeout(() => onDeal(playerId, card), 2000);
    } else if (isCurrentPlayer && isWinner && !hasGameCompleted) {
      onDeal(playerId, null);
    } else if (isCurrentPlayer && isWinner && hasGameCompleted) {
      onDeal(playerId, null);
    }
  }, [
    isCurrentPlayer,
    playerCards,
    playCardTypeOnTable,
    isWinner,
    hasGameCompleted,
    onDeal,
    playerId,
  ]);

  const highlight = isCurrentPlayer && !isWinner && !hasGameCompleted;

  return (
    <ComputerDeckComponent
      highlight={highlight}
      isWinner={isWinner}
      playerId={playerId}
    />
  );
}

export default ComputerContainer;
