import ComputerContainer from "./containers/computer/computer.container";
import PlayerContainer from "./containers/player/player.container";
import { PLAYERS } from "./enums";
import useGameInit from "./hooks/useGameInit";


const NUM_OF_PLAYERS = 4;

function App() {

  const { cards, currentPlayer, setCurrentPlayer } = useGameInit();

  return (
    <div>
      <PlayerContainer initialHand={cards.slice(0, 13)} isCurrentPlayer={currentPlayer === PLAYERS.HUMAN} />
      <ComputerContainer initialHand={cards.slice(13, 26)} isCurrentPlayer={currentPlayer === PLAYERS.COM1} />
      <ComputerContainer initialHand={cards.slice(26, 39)} isCurrentPlayer={currentPlayer === PLAYERS.COM2} />
      <ComputerContainer initialHand={cards.slice(39, 52)} isCurrentPlayer={currentPlayer === PLAYERS.COM3} />
    </div>
  )
}

export default App
