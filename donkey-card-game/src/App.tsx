import { lazy, Suspense } from "react";
import {
  Button,
  InfoComponent,
  ScoreCard,
  ScreenComponent,
  TableComponent,
} from "./components";
import ModalComponent from "./components/modal.component";
import ComputerContainer from "./containers/computer/computer.container";
import { PLAYERS_ENUM } from "./enums";
import { useGameInit, useGameModals, useTable } from "./hooks";

const PlayerContainer = lazy(
  () => import("./containers/player/player.container")
);

function App() {
  const {
    playerState,
    currentPlayOrder,
    changePlayOrderTracker,
    currentPlayerTracker,
    removeCardOnDeal,
    addCardsOnHit,
    gameState,
    screenText,
    setScreenText,
    loadPlayer,
  } = useGameInit();
  const { table, onDeal } = useTable(
    currentPlayOrder,
    currentPlayerTracker,
    changePlayOrderTracker,
    removeCardOnDeal,
    gameState,
    setScreenText,
    addCardsOnHit
  );
  const {
    showScoreModal,
    closeScoreModal,
    openInfoModal,
    closeInfoModal,
    showInfoModal,
  } = useGameModals(gameState);



  return (
    <div className="h-full bg-gradient-to-r from-purple-800 to-purple-900 p-4 flex flex-col">
      <div className="flex justify-between items-center my-3">
        <ScreenComponent text={screenText} />
        <div className="justify-self-end ml-auto">
          <Button onClick={openInfoModal}>Info</Button>
        </div>
      </div>

      <div className="flex items-center justify-between grow max-h-48 md:max-h-64">
        <ComputerContainer
          playerId={PLAYERS_ENUM.COM1}
          playerCards={playerState[PLAYERS_ENUM.COM1]}
          isCurrentPlayer={
            currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM1
          }
          onDeal={onDeal}
          playCardTypeOnTable={table[0]?.card.type}
          gameState={gameState}
        />
        <ComputerContainer
          playerId={PLAYERS_ENUM.COM2}
          playerCards={playerState[PLAYERS_ENUM.COM2]}
          isCurrentPlayer={
            currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM2
          }
          onDeal={onDeal}
          playCardTypeOnTable={table[0]?.card.type}
          gameState={gameState}
        />
        <ComputerContainer
          playerId={PLAYERS_ENUM.COM3}
          playerCards={playerState[PLAYERS_ENUM.COM3]}
          isCurrentPlayer={
            currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM3
          }
          onDeal={onDeal}
          playCardTypeOnTable={table[0]?.card.type}
          gameState={gameState}
        />
      </div>

      <TableComponent table={table} />

      <Suspense fallback={<p className="text-white text-center text-bold">Loading user deck....</p>}>
        <PlayerContainer
          playerId={PLAYERS_ENUM.HUMAN}
          playerCards={playerState[PLAYERS_ENUM.HUMAN]}
          isCurrentPlayer={
            currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.HUMAN
          }
          onDeal={onDeal}
          playCardTypeOnTable={table[0]?.card.type}
          gameState={gameState}
          loadPlayer={loadPlayer}
        />
      </Suspense>

      <ModalComponent
        showModal={showScoreModal}
        closeModal={closeScoreModal}
        title="GAME STATS"
      >
        <ScoreCard gameState={gameState} />
      </ModalComponent>

      <ModalComponent
        showModal={showInfoModal}
        closeModal={closeInfoModal}
        title="GAME INFO"
      >
        <InfoComponent />
      </ModalComponent>
    </div>
  );
}

export default App;
