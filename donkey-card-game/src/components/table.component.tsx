import React from 'react'
import { PLAYERS_ENUM } from '../enums';
import { ITable } from '../interface/table';
import { getPlayerColor } from '../utils';

interface IProps {
    table: ITable;
}

function TableComponent({table}:IProps) {
  return (
    <div className='grow w-full border-2 flex items-center justify-between shadow shadow-cyan-500'>
        {table.map(item => {
            return <div className={`h-40 w-32 border-white border-4 mx-2 p-2 ${getPlayerColor(item.player)}`} key={item.card.rank + item.card.value + item.card.type}>
                    <img src={item.card.imgSrc?.default} alt="card.svg" className='h-full w-full'></img>
                  </div>
        })}
    </div>
  )
}

export default TableComponent