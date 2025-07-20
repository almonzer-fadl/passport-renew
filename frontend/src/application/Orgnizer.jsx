import {useState, useEffect, useContext} from 'react'
import cancelImg from '../assets/cancel.svg'
import {organizerContext} from '../App'
import {BasicInformation} from './steps/BasicInformation'
import PersonalPhoto from './steps/PersonalPhoto'
import { Popup } from '../popup'
import { useNavigate } from 'react-router-dom'
import { PassportPhoto } from './steps/PassportPhoto'
import {Signature} from './steps/Signature'
export function Organizer(){

    const [step, setStep] = useState(0)
    const stepList = ["Basic Information","Personal Photo","Passport Photo","signature","Location"]
    const pages = [<BasicInformation/>, <PersonalPhoto/>, <PassportPhoto/>,<Signature/>]
    const [showPopup,setShowPopup] = useState(false)
    const navigate = useNavigate()

    const handlePrev = ()=>{
        if(step<=0){
            return
        }
        setStep(s=>s-1)
    }
    const handleNext = ()=>{
        if(step+1>=stepList.length){
            return
        }
        setStep(s=>s+1)
    }
    

    return(
       <div className='absolute w-full bg-blue-50 text-black  p-10 min-h-dvh flex flex-col justify-between align-middle'>

   

        {showPopup && <Popup 
        closeFunc={()=>{navigate('/home')
            setShowPopup(false) }
        }
        returnFunc={()=>{
            setShowPopup(false)            
        }}
            ></Popup>}
       <div>
            <button className='absolute right-8 top-8 m-auto w-10 h-10 justify-self-end cursor-pointer' onClick={()=>{
                navigate('/home')
                console.log("cancel button clicked", showPopup)
            }}>
                <img src={cancelImg} alt="cancel Icon" />
            </button>

            <h1 className='text-4xl text-black font-bold'>Create New Application</h1>
            <h2 className="text-3xl mt-2">Step {step+1}/{stepList.length}: {stepList[step]}</h2>
            <form onSubmit={(e)=>{e.preventDefault()}}>
                {pages[step]}
            </form>
            <div className="flex w-full justify-around mt-10">
                <button className="btn btn-accent" onClick={handlePrev}>Previous</button>
                <button className="btn btn-accent" onClick={handleNext} >Next</button>
            
            </div>
       </div>
       </div>
    )

}