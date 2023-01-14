import { useState } from "react";
import { ScoreCard, TableComponent } from "./components";
import ModalComponent from "./components/modal.component";
import ComputerContainer from "./containers/computer/computer.container";
import PlayerContainer from "./containers/player/player.container";
import { PLAYERS_ENUM } from "./enums";
import { useGameInit } from "./hooks";
import { ICard } from "./interface/card";
import { ITable, ITableEntity } from "./interface/table";




function App() {

  const { playerState, currentPlayOrder, changePlayOrderTracker, currentPlayerTracker, removeCardOnDeal, addCardsOnHit, gameState } = useGameInit();
  const [table, setTable] = useState<ITable>([]);


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

  const onDeal = (player: PLAYERS_ENUM, card: ICard | null) => {
    
    if(!card) {
      const nextPlayer = currentPlayOrder[currentPlayerTracker + 1]; 
      changePlayOrderTracker(
        nextPlayer !== undefined ? nextPlayer : currentPlayOrder[0]
      );
      return;
    }

    let currentTable: ITable = [...table, { player, card }];
    removeCardOnDeal(player, card);
    const hit = compareTable(currentTable);

    if (!hit && currentTable.length < gameState.numOfAvailablePlayers) {
      const nextPlayer = currentPlayOrder[currentPlayerTracker + 1]; 
      changePlayOrderTracker(
        nextPlayer !== undefined ? nextPlayer : currentPlayOrder[0]
      );
      setTable(currentTable);
      return;
    }

    if (!hit && currentTable.length === gameState.numOfAvailablePlayers) {
      const newRoundPlayer = [...currentTable].sort((a, b) => b.card.rank - a.card.rank)[0];
      changePlayOrderTracker(false);
      setTable(currentTable);  
      setTimeout(() => {
        changePlayOrderTracker(newRoundPlayer.player);
        clearTable();
      }, 2000)
   
      return;
    }

    if (hit) {
      console.log("Hit!!")
      const penalties = currentTable.map(item => item.card);
      changePlayOrderTracker(false);
      addCardsOnHit(hit.player, penalties);
      setTable(currentTable);

      setTimeout(() => {
        clearTable();
        changePlayOrderTracker(hit.player);
      },2000)
      return;
    }

  }

  return (
    <div className="h-full bg-gradient-to-r from-purple-800 to-purple-900 p-4 flex flex-col">

      <div className="flex items-center justify-between grow">
        <ComputerContainer playerId={PLAYERS_ENUM.COM1} playerCards={playerState[PLAYERS_ENUM.COM1]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM1} onDeal={onDeal} playCardTypeOnTable={table[0]?.card.type} gameState = {gameState}/>
        <ComputerContainer playerId={PLAYERS_ENUM.COM2} playerCards={playerState[PLAYERS_ENUM.COM2]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM2} onDeal={onDeal} playCardTypeOnTable={table[0]?.card.type} gameState = {gameState}/>
        <ComputerContainer playerId={PLAYERS_ENUM.COM3} playerCards={playerState[PLAYERS_ENUM.COM3]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM3} onDeal={onDeal} playCardTypeOnTable={table[0]?.card.type} gameState = {gameState}/>
      </div>

      <TableComponent table={table}/>

      <PlayerContainer playerId={PLAYERS_ENUM.HUMAN} playerCards={playerState[PLAYERS_ENUM.HUMAN]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.HUMAN} onDeal={onDeal} playCardTypeOnTable={table[0]?.card.type} gameState = {gameState}/>

      <ModalComponent showModal={true} closeModal={() => {}} title="GAME STATS"> 
        <ScoreCard gameState={gameState}/>
      </ModalComponent>
    
    </div>
  )
}

export default App
