import {useState, useEffect, useContext} from 'react'
import cancelImg from '../assets/cancel.svg'
import {organizerContext} from '../App'
import {BasicInformation} from './steps/BasicInformation'
import PersonalPhoto from './steps/PersonalPhoto'
import { Popup } from '../popup'
import { useNavigate } from 'react-router-dom'
import {Button } from '../components/Button'

export function Organizer(){

    const [step, setStep] = useState(0)
    const stepList = ["Basic Information","Personal Photo","Passport Photo","signature","Location"]
    const pages = [<BasicInformation/>, <PersonalPhoto/>]
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
       <>

   

        {showPopup && <Popup 
        closeFunc={()=>{navigate('/home')
            setShowPopup(false) }
        }
        returnFunc={()=>{
            setShowPopup(false)            
        }}
            ></Popup>}
       <div className="bg-blue-50 p-10 h-dvh flex-col justify-center align-middle relative">
        <button className='absolute right-2 top-2 m-auto w-15 h-15 justify-self-end cursor-pointer' onClick={()=>{
            navigate('/home')
            console.log("cancel button clicked", showPopup)
        }}>
            <img src={cancelImg} alt="cancel Icon" />
        </button>

        <h1 className='text-4xl font-bold'>Create New Application</h1>
        <h2 className="text-3xl mt-2">Step {step+1}/{stepList.length}: {stepList[step]}</h2>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            {pages[step]}
        </form>
        <div className="flex w-full gap-10 justify-center">
            <Button onClick={handlePrev} text="Previous"></Button>
            <Button onClick={handleNext} text="Next"></Button>

            {/* <button className="w-1/3 pb-2 pt-2 bg-blue-600 text-white text-2xl rounded-2xl" onClick={handlePrev}>Previous</button>
            <button className="w-1/3 pb-2 pt-2 bg-blue-600 text-white text-2xl rounded-2xl" onClick={handleNext}>Next</button> */}
        </div>
        
       </div>
       </>
    )

}