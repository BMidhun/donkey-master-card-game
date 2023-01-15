import React from 'react'
import { PLAYERS_ENUM } from '../enums'
import { getPlayerColor } from '../utils'

interface IProps {
    playerId: PLAYERS_ENUM,
    isWinner : boolean,
    highlight: boolean
}

function ComputerDeckComponent({playerId,isWinner,highlight}:IProps) {
  return (
    <div className={`border-4 rounded-lg border-white-200 bg-none w-full mx-2 h-3/4 md:h-3/5 flex items-center justify-center shadow-md shadow-gray-700 relative ${getPlayerColor(playerId)} ${ highlight ? "animate-pulse": "" }`}>
      <h1 className="text-white">{isWinner ? "WINNER" : `${playerId}`}</h1>
      { isWinner ? <div className='absolute top-0 right-0 h-8 w-8 transform z-40'>
          <img src={"/assets/icons/crown.svg"}  className='h-full w-full' alt="crown.svg"/>
        </div> : null }
   </div>
  )
}

export default ComputerDeckComponent