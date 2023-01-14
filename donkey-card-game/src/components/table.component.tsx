import React from 'react'
import { PLAYERS_ENUM } from '../enums';
import { ITable } from '../interface/table';
import { getPlayerColor } from '../utils';

interface IProps {
    table: ITable;
}

function TableComponent({table}:IProps) {
  return (
    <div className='grow w-full max-h-32 lg:max-h-48 flex items-center flex-start shadow-md shadow-gray-700 bg-gradient-to-r from-green-600 to-green-800 my-2 rounded-lg'>
        {table.map(item => {
            return <img src={item.card.imgSrc?.default} alt="card.svg" className={`h-3/4 max-w-10 border-white border-4 mx-2 p-1 rounded ${getPlayerColor(item.player)}`} key={item.card.rank + item.card.value + item.card.type}></img>
        })}
    </div>
  )
}

export default TableComponent