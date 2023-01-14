import React from 'react'
import { PLAYERS_ENUM } from '../enums';
import { ITable } from '../interface/table';
import { getPlayerColor } from '../utils';

interface IProps {
    table: ITable;
}

function TableComponent({table}:IProps) {
  return (
    <div className='grow w-full max-h-64 flex items-center flex-start shadow bg-gradient-to-r from-green-600 to-green-800 my-2 rounded-lg'>
        {table.map(item => {
            return <div className={`h-1/2 border-white border-4 mx-2 p-1 rounded ${getPlayerColor(item.player)}`} key={item.card.rank + item.card.value + item.card.type}>
                    <img src={item.card.imgSrc?.default} alt="card.svg" className='h-full w-full'></img>
                  </div>
        })}
    </div>
  )
}

export default TableComponent