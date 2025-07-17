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
        <>
       <div className="no-flex">
        <label htmlFor="fullname">Full Name</label>
        <input type="text"
        name="fullname"
            placeholder="Full Name"
            minLength={5}
            value={fullname}
            onChange={(e)=>{setFullname(e.target.value)}}
        />

       </div>
       
       <div className="no-flex">
        <label htmlFor="passport-number">Passport No.</label>
        <input type="text"
        name="passport-number"
            placeholder="AA123456"
            minLength={5}
            value={passportNo}
            onChange={(e)=>{setPassportNo(e.target.value)}}
        />
       </div>

        <div className="no-flex">
        <label htmlFor="national-number">National No.</label>
        <input type="text"
        name="national-number"
            value={nationalNo}
            placeholder="123-1234-1234"
            maxLength={13}
            onChange={(e)=>{setNationalNo(e.target.value)}}
        />
       </div>

       <div className="no-flex">
        <label htmlFor="birth-place">Birth place</label>
        <input type="text"
        name="birth-place"
            value={birthPlace}
            placeholder="place of birth"
            maxLength={5}
            onChange={(e)=>{setBirthPlace(e.target.value)}}
        />
       </div>


       <div className="no-flex">
        <label htmlFor="birthday">Birthday</label>
        <input type="date"
        name="birthday"
            value={birthday}
            onChange={(e)=>{setBirthday(e.target.value)}}
            max={today}
            
        />
       </div>  
       
       <div className="no-flex">
        <label htmlFor="expiry">Passport expiry date</label>
        <input type="text"
        name="expiry"
            value={expiry}
            placeholder="mm/yy"
            maxLength={5}
            onChange={(e)=>{setExpiry(e.target.value)}}
        />
       </div>

      
       
        
       </>
    )
}