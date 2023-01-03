import { useState } from "react";
import ComputerContainer from "./containers/computer/computer.container";
import PlayerContainer from "./containers/player/player.container";
import { PLAYERS } from "./enums";
import useGameInit from "./hooks/useGameInit";
import { ITable } from "./interface/table";


const NUM_OF_PLAYERS = 4;

function App() {

  const {gameState, currentPlayer, setCurrentPlayer } = useGameInit();
  const [table,setTable] = useState<ITable>([]);


  return (
    <div>
      <ComputerContainer playerId={PLAYERS.COM1} playerCards={gameState[PLAYERS.COM1]} isCurrentPlayer={currentPlayer === PLAYERS.COM1}/>
      <ComputerContainer playerId={PLAYERS.COM2} playerCards={gameState[PLAYERS.COM2]} isCurrentPlayer={currentPlayer === PLAYERS.COM2}/>
      <ComputerContainer playerId={PLAYERS.COM3} playerCards={gameState[PLAYERS.COM3]} isCurrentPlayer={currentPlayer === PLAYERS.COM1}/>

      <div>
         Current Table State : {JSON.stringify(table)}
      </div>

      <PlayerContainer playerId={PLAYERS.HUMAN} playerCards={gameState[PLAYERS.HUMAN]} isCurrentPlayer={currentPlayer === PLAYERS.COM3}/>
    </div>
  )
}

export default App
