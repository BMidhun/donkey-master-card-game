import React from 'react'
import { CARD_TYPE_ENUM, PLAYERS_ENUM } from '../enums';
import { ICard, ICardSet } from '../interface/card'
import { getPlayerColor } from '../utils';

interface IProps {
    playerCards: ICardSet;
    onCardSelect: (card:ICard) => void;
}

function PlayerDeckComponent({playerCards,onCardSelect}:IProps) {
  let top=0;
  return (
    <>
    <div className={`my-2 flex items-baseline justify-between grow overflow-auto border-4 shadow shadow-grey-400 relative ${getPlayerColor(PLAYERS_ENUM.HUMAN)}`}>
        {Object.keys(playerCards).map(item => {
             const k = (item as unknown) as CARD_TYPE_ENUM
             return <div key={item} className="h-full w-full relative">
                        {
                        
                        playerCards[k].map((card, index) => {
                            top = index * 8
                            return  <div key={card.rank} className="cursor-pointer z-50" style={{position:"absolute", top:`${top}%`, transform:"scale(0.75)"}}
                                      onClick={() => {onCardSelect(card)}}
                                    >
                                        <img src={card.imgSrc?.default} className="transition ease-in hover:-translate-y-6 "></img>
                                    </div>
                        })}
                    </div>
        })}
    </div>
    <h4 className='text-center text-white bg-green-500'>User Deck</h4>
    </>
  )
}

export default PlayerDeckComponent