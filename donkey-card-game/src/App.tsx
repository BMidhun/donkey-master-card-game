import { useEffect, useState } from "react";
import { TableComponent } from "./components";
import ComputerContainer from "./containers/computer/computer.container";
import PlayerContainer from "./containers/player/player.container";
import { PLAYERS_ENUM } from "./enums";
import { useGameInit } from "./hooks";
import { ICard } from "./interface/card";
import { ITable, ITableEntity } from "./interface/table";




function App() {

  const { playerState, currentPlayOrder, changePlayOrderTracker, currentPlayerTracker, removeCardOnDeal, addCardsOnHit, gameState } = useGameInit();
  const [table, setTable] = useState<ITable>([]);

  console.log(currentPlayOrder, currentPlayerTracker);

  useEffect(() => {
    if (gameState.numOfAvailablePlayers === 1)
      window.alert("Game over");
  }, [gameState])

  function compareTable(currentTable: ITable): ITableEntity | undefined {
    // check card's type on table. If same then return currentTable, else add logic to push the hit cards to the player who got hit.
    if (currentTable.length === 1)
      return;

    let isHit = false;
    const compareItem = currentTable[0];
    for (let item of currentTable) {
      if (item.card.type !== compareItem.card.type) {
        isHit = true;
        break;
      }
    }
    if (!isHit)
      return;

    const hitCards = currentTable.filter(item => item.card.type === compareItem.card.type);
    const sortHitCards = hitCards.sort((a, b) => b.card.rank - a.card.rank);

    return sortHitCards[0];
  }

  function clearTable() {
    setTable([]);
  }

  const onDeal = (player: PLAYERS_ENUM, card: ICard) => {
    let currentTable: ITable = [...table, { player, card }];
    removeCardOnDeal(player, card);
    const hit = compareTable(currentTable);

    if (!hit && currentTable.length !== gameState.numOfAvailablePlayers) {
      console.log("Normal play");
      changePlayOrderTracker();
      setTable(currentTable);
      return;
    }

    if (!hit && currentTable.length === gameState.numOfAvailablePlayers) {
      console.log("Round complete");
      const newRoundPlayer = currentTable.sort((a, b) => b.card.rank - a.card.rank)[0];
      changePlayOrderTracker(newRoundPlayer.player);
      clearTable();
      return;
    }

    if (hit) {
      console.log("Hit!!")
      const penalties = currentTable.map(item => item.card);
      addCardsOnHit(hit.player, penalties);
      clearTable();
      changePlayOrderTracker(hit.player);
      return;
    }

  }

  return (
    <div className="h-full max-w-lg mx-auto bg-fuchsia-800 p-4 flex flex-col">
      <div className="flex items-center justify-between grow">
        <ComputerContainer playerId={PLAYERS_ENUM.COM1} playerCards={playerState[PLAYERS_ENUM.COM1]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM1} onDeal={onDeal} table={table} />
        <ComputerContainer playerId={PLAYERS_ENUM.COM2} playerCards={playerState[PLAYERS_ENUM.COM2]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM2} onDeal={onDeal} table={table} />
        <ComputerContainer playerId={PLAYERS_ENUM.COM3} playerCards={playerState[PLAYERS_ENUM.COM3]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM3} onDeal={onDeal} table={table} />
      </div>

      <TableComponent table={table}/>

      <PlayerContainer playerId={PLAYERS_ENUM.HUMAN} playerCards={playerState[PLAYERS_ENUM.HUMAN]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.HUMAN} onDeal={onDeal} table={table} />
    </div>
  )
}

export default App
