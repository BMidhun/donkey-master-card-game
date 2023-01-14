import {ReactNode} from 'react'

interface IProps {
    children: ReactNode
    onClick: () => void;
}


function Button({children,onClick}:IProps) {
  return (
    <button className='w-full p-2 bg-violet-700 rounded text-white hover:bg-violet-800' onClick={onClick}>
        {children}
    </button>
  )
}

export default Button