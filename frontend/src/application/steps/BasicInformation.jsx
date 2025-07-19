import { useState } from "react"

export function BasicInformation(){

    const [fullname, setFullname] = useState('')
    const [passportNo, setPassportNo] = useState('')
    const [birthday, setBirthday] = useState('')
    const [expiry, setExpiry] = useState('')
    const [nationalNo, setNationalNo]= useState('')
    const [birthPlace, setBirthPlace] = useState('')

    const today = new Date().toISOString().split('T')[0]

    return (
        <div className="flex-col p-5">
       <div >
        <label htmlFor="fullname">Full Name</label>
        <input type="text"
        name="fullname"
        className="border-1 rounded-md p-2 text-lg mb-3 w-full"
            placeholder="Full Name"
            minLength={5}
            value={fullname}
            onChange={(e)=>{setFullname(e.target.value)}}
        />

       </div>
       
       <div >
        <label htmlFor="passport-number">Passport No.</label>
        <input type="text"
        className="border-1 rounded-md p-2 text-lg mb-3 w-full"
        name="passport-number"
            placeholder="AA123456"
            minLength={5}
            value={passportNo}
            onChange={(e)=>{setPassportNo(e.target.value)}}
        />
       </div>

        <div >
        <label htmlFor="national-number">National No.</label>
        <input type="text"
        className="border-1 rounded-md p-2 text-lg mb-3 w-full"
        name="national-number"
            value={nationalNo}
            placeholder="123-1234-1234"
            maxLength={13}
            onChange={(e)=>{setNationalNo(e.target.value)}}
        />
       </div>

       <div >
        <label htmlFor="birth-place">Birth place</label>
        <input type="text"
        className="border-1 rounded-md p-2 text-lg mb-3 w-full"
        name="birth-place"
            value={birthPlace}
            placeholder="place of birth"
            maxLength={5}
            onChange={(e)=>{setBirthPlace(e.target.value)}}
        />
       </div>


       <div >
        <label htmlFor="birthday">Birthday</label>
        <input type="date"
        className="border-1 rounded-md p-2 text-lg mb-3 w-full"
        name="birthday"
            value={birthday}
            onChange={(e)=>{setBirthday(e.target.value)}}
            max={today}
            
        />
       </div>  
       
       <div >
        <label htmlFor="expiry">Passport expiry date</label>
        <input type="text"
        className="border-1 rounded-md p-2 text-lg mb-3 w-full"
        name="expiry"
            value={expiry}
            placeholder="mm/yy"
            maxLength={5}
            onChange={(e)=>{setExpiry(e.target.value)}}
        />
       </div>

      
       
        
       </div>
    )
}