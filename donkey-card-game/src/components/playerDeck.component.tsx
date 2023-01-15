import { CARD_TYPE_ENUM, PLAYERS_ENUM } from '../enums';
import { ICard, ICardSet } from '../interface/card'
import { getPlayerColor } from '../utils';
import Crown from "../assets/icons/crown.svg"

interface IProps {
    playerCards: ICardSet;
    onCardSelect: (card:ICard) => void;
    highlight: boolean;
    isWinner: boolean
}

function PlayerDeckComponent({playerCards,onCardSelect, isWinner, highlight}:IProps) {
  let top=0;
  return (
    <>
   {!isWinner ? <div className={`my-2 rounded-lg flex items-baseline justify-between grow overflow-auto border-4 shadow-md shadow-gray-700 relative ${getPlayerColor(PLAYERS_ENUM.HUMAN)} ${ highlight ? "animate-pulse": "" }`}>
        {
        Object.keys(playerCards).map(item => {
             const k = (item as unknown) as CARD_TYPE_ENUM
             return <div key={item} className="h-full w-full relative">
                        {
                        
                        playerCards[k].map((card, index) => {
                            top = index * 8
                            return <img key={card.rank} src={card.imgSrc?.default} className="transition ease-in hover:-translate-y-6 cursor-pointer z-30 absolute transform scale-75" style={{top:`${top}%`}} onClick={() => {onCardSelect(card)}} alt="card.svg"></img>
                        })}
                    </div>
        })}
    </div>
    :

    <div className={`my-2 rounded-lg flex items-center justify-center grow border-4 shadow-lg shadow-gray-700 relative ${getPlayerColor(PLAYERS_ENUM.HUMAN)}`}>
       <div className='absolute top-0 right-0 h-10 w-10 transform z-40'>
          <img src={Crown}  className='h-full w-full' alt="crown.svg"/>
        </div>
        <span className='text-white text-bold'>WINNER</span>
    </div>
        
  }
    </>
  )
}

export default PlayerDeckComponent