import {ReactNode} from 'react';
import {createPortal} from "react-dom";
import {Button} from "./"

const ROOT = document.getElementById("root");

interface IProps {
    showModal: boolean,
    closeModal: () => void,
    children: ReactNode,
     title:string
}

function ModalComponent({showModal, closeModal, children, title}:IProps) {

  if(!showModal)
    return null;

 if(ROOT)
  return createPortal(
    <div className='filter backdrop-blur-md w-full h-full absolute z-50 flex flex-col items-center justify-center'>
        <div className='w-10/12 mx-auto my-auto shadow max-h-96 min-h-fit overflow-auto border-2 border-gray-300 p-2 flex flex-col bg-white rounded'>
             <div className='flex items-center justify-between border-b-2 border-gray-200 pb-2'>
                <h4 className='text-lg text-bold grow'>{title}</h4>
                <div><Button onClick={closeModal}>Close</Button></div>
             </div>
            <div className='grow p-2'>{children}</div>    
        </div>
    </div>
    ,ROOT)

else
    return null;
}

export default ModalComponent