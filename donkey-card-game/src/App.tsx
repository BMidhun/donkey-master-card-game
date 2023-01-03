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
      {gameState.map((player) => {
        const {playerHand,type} = player
        if(type === PLAYERS.HUMAN)
         return <PlayerContainer isCurrentPlayer={currentPlayer === type} playerCards={playerHand} playerId={type} key={type}></PlayerContainer>
        else
          return <ComputerContainer isCurrentPlayer={currentPlayer === type} playerCards={playerHand} playerId={type} key={type}/>
      })}
    </div>
  )
}

export default App
