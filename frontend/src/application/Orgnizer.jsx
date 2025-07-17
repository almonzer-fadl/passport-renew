import {useState, useEffect, useContext} from 'react'
import './Organizer.css' 
import cancelImg from '../assets/cancel.svg'
import {organizerContext} from '../App'
import {BasicInformation} from './steps/BasicInformation'
import PersonalPhoto from './PersonalPhoto'

export function Organizer(){

    const {isOrganizerRunning, setIsOrganizerRunning} = useContext(organizerContext)
    const [step, setStep] = useState(0)
    const stepList = ["Basic Information","Personal Photo","Passport Photo","signature","Location"]
    const pages = [<BasicInformation/>, <PersonalPhoto/>]
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
       <div className="shade-back"></div>
       <div className="container absolute">
        <button className='cancel-btn button' onClick={()=>setIsOrganizerRunning(false)}>
            <img src={cancelImg} alt="cancel Icon" />
        </button>

        <h1>Create New Application</h1>
        <h2>Step {step+1}/{stepList.length}: {stepList[step]}</h2>
        <form onSubmit={(e)=>{e.preventDefault()}}>
            {pages[step]}
        </form>
        <div className="flex-row full-width">
            <button className='call-to-action' onClick={handlePrev}>Previous</button>
            <button className='call-to-action' onClick={handleNext}>Next</button>
        </div>
        
       </div>
       </>
    )

}