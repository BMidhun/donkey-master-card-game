import React from 'react'
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
   {!isWinner ? <div className={`my-2 rounded-lg flex items-baseline justify-between grow overflow-auto border-4 shadow shadow-grey-400 relative ${getPlayerColor(PLAYERS_ENUM.HUMAN)} ${ highlight ? "animate-pulse": "" }`}>
        { isWinner ? <div className='absolute top-0 right-0 h-10 w-10 transform z-40'>
          <img src={Crown}  className='h-full w-full'/>
        </div> : null }
        {
        Object.keys(playerCards).map(item => {
             const k = (item as unknown) as CARD_TYPE_ENUM
             return <div key={item} className="h-full w-full relative">
                        {
                        
                        playerCards[k].map((card, index) => {
                            top = index * 8
                            return  <div key={card.rank} className="cursor-pointer z-30" style={{position:"absolute", top:`${top}%`, transform:"scale(0.75)"}}
                                      onClick={() => {onCardSelect(card)}}
                                    >
                                        <img src={card.imgSrc?.default} className="transition ease-in hover:-translate-y-6 "></img>
                                    </div>
                        })}
                    </div>
        })}
    </div>
    :

    <div className={`my-2 rounded-lg flex items-center justify-center grow border-4 shadow shadow-grey-400 ${getPlayerColor(PLAYERS_ENUM.HUMAN)}`}>
      <h4 className='text-bold text-white'>WINNER</h4>
    </div>
        
  }
    </>
  )
}

export default PlayerDeckComponent