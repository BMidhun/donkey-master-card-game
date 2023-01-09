import { useState } from "react";
import ComputerContainer from "./containers/computer/computer.container";
import PlayerContainer from "./containers/player/player.container";
import { PLAYERS_ENUM } from "./enums";
import {useGameInit} from "./hooks";
import { ICard } from "./interface/card";
import { ITable } from "./interface/table";




function App() {

  const { playerState, currentPlayOrder, changePlayOrderTracker, currentPlayerTracker } = useGameInit();
  const [table, setTable] = useState<ITable>([]);

  console.log(currentPlayOrder, currentPlayerTracker);

  const onDeal = (player: PLAYERS_ENUM, card: ICard) => {
    setTable(prev => [...prev, { card, player }]);
    changePlayOrderTracker();
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
