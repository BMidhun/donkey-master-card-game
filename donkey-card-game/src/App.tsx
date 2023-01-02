import { useEffect, useState } from "react"
import { cardSet } from "./entities/card-set";
import { ICard } from "./interface/card";
import { shuffleCards } from "./utils";

function App() {

  useEffect(() => {

    async function init() {
       setCards(await cardSet);
    }

    init();

  },[])

  const [cards,setCards] = useState<ICard[]>([]);

  return (
    <div>
       {cards.map(card => {
         const {imgSrc} = card;
         console.log({imgSrc})
         return <div key={card.rank + card.type}>
            <img src={imgSrc?.default} alt="card.svg" width={100}></img>
         </div>
       })}
    </div>
  )
}

export default App
