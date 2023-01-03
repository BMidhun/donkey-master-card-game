import { useState } from "react";
import ComputerContainer from "./containers/computer/computer.container";
import PlayerContainer from "./containers/player/player.container";
import { PLAYERS } from "./enums";
import {useGameInit} from "./hooks";
import { ICard } from "./interface/card";
import { ITable } from "./interface/table";




function App() {

  const { playerState, currentPlayers, setCurrentPlayers, currentPlayerTracker,setCurrentPlayerTracker } = useGameInit();
  const [table, setTable] = useState<ITable>([]);

  console.log(currentPlayers, currentPlayerTracker);

  const onDeal = (player: PLAYERS, card: ICard) => {
    setTable(prev => [...prev, { card, player }]);
    setCurrentPlayerTracker(prev => prev + 1);
  }

  return (
    <div>
      <ComputerContainer playerId={PLAYERS.COM1} playerCards={playerState[PLAYERS.COM1]} isCurrentPlayer={currentPlayers[currentPlayerTracker] === PLAYERS.COM1} onDeal={onDeal} table={table}/>
      <ComputerContainer playerId={PLAYERS.COM2} playerCards={playerState[PLAYERS.COM2]} isCurrentPlayer={currentPlayers[currentPlayerTracker] === PLAYERS.COM2} onDeal={onDeal} table={table}/>
      <ComputerContainer playerId={PLAYERS.COM3} playerCards={playerState[PLAYERS.COM3]} isCurrentPlayer={currentPlayers[currentPlayerTracker] === PLAYERS.COM3} onDeal={onDeal} table={table}/>

      <div>
        Current Table State : {JSON.stringify(table)}
      </div>

      <PlayerContainer playerId={PLAYERS.HUMAN} playerCards={playerState[PLAYERS.HUMAN]} isCurrentPlayer={currentPlayers[currentPlayerTracker] === PLAYERS.HUMAN} onDeal={onDeal} table={table}/>
    </div>
  )
}

export default App
