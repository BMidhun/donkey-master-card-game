import React from 'react'
import { CARD_TYPE_ENUM } from '../enums';
import { ICardSet } from '../interface/card'

interface IProps {
    playerCards: ICardSet;
}

function PlayerDeckComponent({playerCards}:IProps) {
  let top=0;
  return (
    <div className='my-2 flex items-baseline justify-between grow overflow-auto'>
        {Object.keys(playerCards).map(item => {
             const k = (item as unknown) as CARD_TYPE_ENUM
             return <div key={item} className="h-full w-full relative">
                        {
                        
                        playerCards[k].map((card, index) => {
                            top = index * 25
                            return  <div key={card.rank} className="cards" style={{position:"absolute", top:`${top}px`, transform:"scale(0.75)"}}>
                                        <img src={card.imgSrc?.default}></img>
                                    </div>
                        })}
                    </div>
        })}
    </div>
  )
}

export default PlayerDeckComponent