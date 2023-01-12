import { useState } from "react";
import ComputerContainer from "./containers/computer/computer.container";
import PlayerContainer from "./containers/player/player.container";
import { PLAYERS_ENUM } from "./enums";
import {useGameInit} from "./hooks";
import { ICard } from "./interface/card";
import { ITable } from "./interface/table";




function App() {

  const { playerState, currentPlayOrder, changePlayOrderTracker, currentPlayerTracker, removeCardOnDeal, addCardsOnHit } = useGameInit();
  const [table, setTable] = useState<ITable>([]);

  console.log(currentPlayOrder, currentPlayerTracker);

  function compareTable(currentTable:ITable) {
     // check card's type on table. If same then return currentTable, else add logic to push the hit cards to the player who got hit.
     
  }

  const onDeal = (player: PLAYERS_ENUM, card: ICard) => {
    let currentTable:ITable = [...table,{player,card}];
    removeCardOnDeal(player,card);
    if(currentTable.length === 1)
      {
        changePlayOrderTracker();
        setTable(currentTable);
        return;
      }
    
  }

  return (
    <div>
      <ComputerContainer playerId={PLAYERS_ENUM.COM1} playerCards={playerState[PLAYERS_ENUM.COM1]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM1} onDeal={onDeal} table={table}/>
      <ComputerContainer playerId={PLAYERS_ENUM.COM2} playerCards={playerState[PLAYERS_ENUM.COM2]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM2} onDeal={onDeal} table={table}/>
      <ComputerContainer playerId={PLAYERS_ENUM.COM3} playerCards={playerState[PLAYERS_ENUM.COM3]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.COM3} onDeal={onDeal} table={table}/>

      <div>
        Current Table State : {JSON.stringify(table)}
      </div>

      <PlayerContainer playerId={PLAYERS_ENUM.HUMAN} playerCards={playerState[PLAYERS_ENUM.HUMAN]} isCurrentPlayer={currentPlayOrder[currentPlayerTracker] === PLAYERS_ENUM.HUMAN} onDeal={onDeal} table={table}/>
    </div>
  )
}

export default App
