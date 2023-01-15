import React from 'react'
import { PLAYERS_ENUM } from '../enums';
import { IGameState } from '../interface/game'
import {Button} from './';

interface IProps {
    gameState: IGameState
}

function ScoreCard({ gameState }: IProps) {

    const {winners} = gameState;

    return (
        <div className='flex flex-col overflow-auto h-full'>
            <div className='pb-2 border-b-2 border-gray-300 overflow-auto'>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th>PLAYERS</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(winners).map(player => {
                            const k = (player as unknown) as PLAYERS_ENUM
                            return <tr key={player}>
                                     <td className='text-center'>{player}</td>
                                     <td className='flex justify-center items-start'>{winners[k] ? <img src={"/assets/icons/crown.svg"} alt="crown.svg" className='w-8'/> : <img src={"/assets/icons/donkey.svg"} alt="donkey.svg" className='w-8'></img>}</td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div className='my-2'>
                <Button onClick={() => {window.location.reload()}}>New Game</Button>
            </div>
        </div>
    )
}

export default ScoreCard