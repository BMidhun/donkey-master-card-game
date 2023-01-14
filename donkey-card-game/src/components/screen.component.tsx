import React from 'react'

interface IProps {
    text: string
}

function ScreenComponent({text}:IProps) {
    return text ? <div className='rounded  p-2 text-center text-white w-full mr-2 h-full shadow shadow-gray-800 bg-sky-600'>{text}</div> : null
}

export default ScreenComponent