import React from 'react'
import { IScreenText } from '../interface/game'

interface IProps {
    text: IScreenText | null
}

function ScreenComponent({text}:IProps) {
    return text ? <div className={`rounded  p-2 text-center text-white w-full mr-2 h-full shadow shadow-gray-600 ${text.type === "HIT" ? "bg-red-600": "bg-green-600"}`}>{text.message}</div> : null
}

export default ScreenComponent