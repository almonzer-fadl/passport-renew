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
    const [fullnameEn, setFullnameEn] = useState("")
    const [fullnameAr, setFullnameAr] = useState("")
    const [passportNo, setPassportNo] = useState("")
    const [nationalNo, setNationalNo] = useState("")
    const [birthPlace, setBirthPlace] = useState("")
    const [birthday, setBirthday] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [issueDate, setIssueDate] = useState("")
    const [gender , setGender] = useState("")
    const [personalPhoto, setPersonalPhoto] = useState(null)
    const [passportPhoto, setPassportPhoto] = useState(null)
    const [signature, setSignature] = useState(null)
    const [location, setLocation] = useState("")
    const [inSudan, setInSudan] = useState('')
    const [step, setStep] = useState(0)
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Load state from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('applicationFormData');
        console.log(JSON.parse(savedData));
        
        if (savedData) {
            const data = JSON.parse(savedData);
            setFullnameEn(data.fullnameEn || '');
            setFullnameAr(data.fullnameAr || '');
            setPassportNo(data.passportNo || '');
            setNationalNo(data.nationalNo || '');
            setBirthPlace(data.birthPlace || '');
            setBirthday(data.birthday || '');
            setExpiryDate(data.expiryDate || '');
            setIssueDate(data.issueDate || '');
            setGender(data.gender||'');
            setPersonalPhoto(data.personalPhoto || null);
            setPassportPhoto(data.passportPhoto || null);
            setSignature(data.signature || null);
            setLocation(data.location || '');
            setInSudan(data.inSudan || '');
            setStep(data.step || 0);
        }
        setIsInitialLoad(false);
    }, []); // Empty dependency array ensures this runs only once on mount

    // Save state to localStorage whenever it changes
    useEffect(() => {
        if (!isInitialLoad) {
            const applicationData = {
                fullnameEn,
                fullnameAr,
                passportNo,
                nationalNo,
                birthPlace,
                birthday,
                expiryDate,
                issueDate,
                gender,
                personalPhoto,
                passportPhoto,
                signature,
                location,
                inSudan,
                step
            };
            localStorage.setItem('applicationFormData', JSON.stringify(applicationData));
        }
    }, [isInitialLoad, fullnameEn, fullnameAr,passportNo, nationalNo, birthPlace, birthday, expiryDate, issueDate,gender, personalPhoto, passportPhoto, signature, location, inSudan, step]);


    const basicInfoPayload = {
        fullnameEn,setFullnameEn,
        fullnameAr,setFullnameAr,
        passportNo,setPassportNo,
        nationalNo, setNationalNo,
        birthPlace, setBirthPlace,
        birthday, setBirthday,
        expiryDate, setExpiryDate,
        issueDate, setIssueDate,
        gender, setGender
    }

  
    
    //local variables
    const stepList = ["Basic Information","Personal Photo","Passport Photo","signature","Location"]
    const pages = [
        <BasicInformation payload={basicInfoPayload}/>, 
        <PersonalPhoto photo={[personalPhoto,setPersonalPhoto]}/>, 
        <PassportPhoto photo={[passportPhoto, setPassportPhoto]}/>,
        <Signature photo={[signature, setSignature]}/>,
        <Location location={[location,setLocation]} inSudan={[inSudan, setInSudan]}/>
    ]
    const navigate = useNavigate()
     const stepComplete = [
        fullnameEn&& fullnameAr && passportNo && nationalNo && birthPlace && birthday && expiryDate&& issueDate && gender,
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
                        fullnameAr,
                        fullnameEn,
                        passportNo,
                        nationalNo,
                        birthPlace,
                        birthday,
                        issueDate,
                        expiryDate,
                        gender,
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
            localStorage.removeItem('applicationFormData');
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
       <div>
            

            <header className="min-w-full flex flex-row justify-between bg-blue-800 p-5 rounded-2xl">

            <h1 className='text-4xl text-white font-bold'>Create New Application</h1>
            <button className=' w-10 h-10 justify-self-end cursor-pointer' onClick={()=>{
                document.getElementById('exit-modal').showModal()
                console.log("cancel button clicked")
            }}>

                
                <img src={cancelImg} alt="cancel Icon" />
            </button>

    <dialog id="exit-modal" className="modal">
        <div className="modal-box bg-blue-100">
            <h3 className="font-bold text-lg ">Are you sure you want to exit?</h3>
            <p className="py-4">Press ESC key or click Go Back to close</p>
            <div className="modal-backdrop modal-action" method="dialog">
            <button className='btn-primary btn' onClick={()=>document.getElementById('exit-modal').close()}>Cancel</button>
            <button className='btn-error btn text-gray-100' onClick={
                ()=>{
                    document.getElementById('exit-modal').close()
                    navigate('/home')
                }
                }>Exit</button>
            </div>
        </div>
    </dialog>

            </header>
            <ul className="steps w-full my-5">
  {stepList.map((title,index)=>(
     <li key={index} className={`step ${index<=step?"step-primary":""}`}>{title}</li>
  ))}
 
</ul>
            {/* <h2 className="text-3xl my-10">Step {step+1}/{stepList.length}: <span className='bg-blue-200 text-black rounded-4xl p-2 px-4'>{stepList[step]}</span></h2> */}
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