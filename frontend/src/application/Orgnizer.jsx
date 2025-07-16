import {useState, useEffect} from 'react'
import './Organizer.css' 
import cancelImg from '../assets/cancel.svg'

export function Organizer(){

    const [isQuit, setIsQuit] = useState(false)
    const [step, setStep] = useState(0)

    if(isQuit){
        return
    }

    return(
       <>
       <div className="shade-back"></div>
       <div className="container absolute">
        <button className='cancel-btn button' onClick={()=>setIsQuit(true)}>
            <img src={cancelImg} alt="cancel Icon" />
        </button>

       </div>
       </>
    )

}