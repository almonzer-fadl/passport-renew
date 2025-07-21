import {useState, useEffect, useContext} from 'react'
import cancelImg from '../assets/cancel.svg'
import {organizerContext} from '../App'
import {BasicInformation} from './steps/BasicInformation'
import PersonalPhoto from './steps/PersonalPhoto'
import { Popup } from '../popup'
import { useNavigate } from 'react-router-dom'
import { PassportPhoto } from './steps/PassportPhoto'
import {Signature} from './steps/Signature'
import {Location} from './steps/Location'
import { useAuth } from '../auth/AuthContext'
export function Organizer(){
    const {user} = useAuth()
    //initializing variables for the whole application creation process
    const [fullname, setFullname] = useState("mohannad")
    const [passportNo, setPassportNo] = useState("AA123456")
    const [nationalNo, setNationalNo] = useState("222-222-1234")
    const [birthPlace, setBirthPlace] = useState("city")
    const [birthday, setBirthday] = useState(new Date().toISOString().split('T')[0])
    const [expiry, setExpiry] = useState("10/26")
    const [personalPhoto, setPersonalPhoto] = useState(null)
    const [passportPhoto, setPassportPhoto] = useState(null)
    const [signature, setSignature] = useState(null)
    const [location, setLocation] = useState("")
    const [inSudan, setInSudan] = useState('')

    const basicInfoPayload = {
        fullname,setFullname,
        passportNo,setPassportNo,
        nationalNo, setNationalNo,
        birthPlace, setBirthPlace,
        birthday, setBirthday,
        expiry, setExpiry
    }

  
    
    //local variables
    const [step, setStep] = useState(0)
    const stepList = ["Basic Information","Personal Photo","Passport Photo","signature","Location"]
    const pages = [
        <BasicInformation payload={basicInfoPayload}/>, 
        <PersonalPhoto photo={[personalPhoto,setPersonalPhoto]}/>, 
        <PassportPhoto photo={[passportPhoto, setPassportPhoto]}/>,
        <Signature photo={[signature, setSignature]}/>,
        <Location location={[location,setLocation]} inSudan={[inSudan, setInSudan]}/>
    ]
    const [showPopup,setShowPopup] = useState(false)
    const navigate = useNavigate()
     const stepComplete = [
        fullname && passportNo && nationalNo && birthPlace && birthday && expiry,
        personalPhoto !== null,
        passportPhoto !== null,
        signature !== null,
        location!==""
    ];


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

    const handleSubmit= async()=>{
        console.log("starting submittion")

        try{
            const response = await fetch("http://localhost:5000/api/create-app",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }, body:JSON.stringify({
                    "email":user.email,
                    'application':{
                        fullname,
                        passportNo,
                        nationalNo,
                        birthPlace,
                        birthday,
                        expiry,
                        location,
                        signature,
                        passportPhoto,
                        personalPhoto
                    }
                })
            }
        )
        if (response.ok){
            alert("submitted successfully")
            navigate('/home')
            return
        }

        }catch(error){
            console.log("error", error)
            return
        }
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
            

            <header className="min-w-full flex flex-row justify-between bg-blue-800 p-5 rounded-2xl">

            <h1 className='text-4xl text-white font-bold'>Create New Application</h1>
            <button className=' w-10 h-10 justify-self-end cursor-pointer' onClick={()=>{
                navigate('/home')
                console.log("cancel button clicked", showPopup)
            }}>
                <img src={cancelImg} alt="cancel Icon" />
            </button>
            </header>
            <h2 className="text-3xl my-10">Step {step+1}/{stepList.length}: <span className='bg-blue-200 text-black rounded-4xl p-2 px-4'>{stepList[step]}</span></h2>
            <form onSubmit={e=>e.preventDefault()}>
                {pages[step]}
            </form>
            <div className="flex w-full justify-around mt-10">
                <button disabled={step===0} className={`btn btn-primary ${step===0?'disabled:btn-ghost':''}`} onClick={handlePrev}>Previous</button>
                <button 
                disabled={!stepComplete[step]}
                className="btn btn-primary disabled:btn-ghost"
                onClick={step===stepList.length-1?handleSubmit:handleNext} >
                    {step===stepList.length-1?"Finish":"Next"}
                    </button>
            
            </div>
       </div>
       </div>
    )

}