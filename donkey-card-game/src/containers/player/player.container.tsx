import { useEffect } from "react";
import PlayerDeckComponent from "../../components/playerDeck.component";
import { CARD_TYPE_ENUM, PLAYERS_ENUM } from "../../enums";
import { ICard, ICardSet } from "../../interface/card";
import { IGameState } from "../../interface/game";

interface IProps {
  playerCards: ICardSet;
  isCurrentPlayer: boolean;
  playerId: PLAYERS_ENUM;
  onDeal: (player: PLAYERS_ENUM, card: ICard | null) => void;
  playCardTypeOnTable: CARD_TYPE_ENUM;
  gameState: IGameState;
  loadPlayer: () => void;
}

function PlayerContainer({
  playerCards,
  isCurrentPlayer,
  playerId,
  onDeal,
  playCardTypeOnTable,
  gameState,
  loadPlayer,
}: IProps) {
  const hasGameCompleted = gameState.numOfAvailablePlayers === 1;
  const isWinner = gameState.winners[playerId];

  useEffect(() => {
    if (hasGameCompleted) return;

    if (isCurrentPlayer && isWinner) {
      onDeal(playerId, null);
    }
  }, [isCurrentPlayer, isWinner, hasGameCompleted, playerId, onDeal]);

  function playerDeal(card: ICard) {
    if (!isCurrentPlayer || hasGameCompleted) return;

    if (!playCardTypeOnTable) {
      onDeal(playerId, card);
      return;
    }

    // When player selects a card of different type from table while holding similar type.
    if (
      card.type !== playCardTypeOnTable &&
      playerCards[playCardTypeOnTable].length
    ) {
      return;
    }

    onDeal(playerId, card);
  }

  const highlight = isCurrentPlayer && !isWinner && !hasGameCompleted;

  return (
    <PlayerDeckComponent
      playerCards={playerCards}
      onCardSelect={playerDeal}
      highlight={highlight}
      isWinner={gameState.winners[playerId]}
      loadPlayer={loadPlayer}
    />
  );
}

export default PlayerContainer;
