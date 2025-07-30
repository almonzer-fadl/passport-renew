
import { useState } from "react"
import { countryList } from "./Countries"
import { useTranslation } from "react-i18next";

export function Location(props){
    const { t } = useTranslation();
    const [inSudan, setInSudan] = props.inSudan
    const [location ,setLocation] = props.location
    const [error, setError] = useState("");


    const chooseStateComp = ( <div>
        <label htmlFor="state">{t('chooseState')}</label>
         <select name="state" id="state" 
         value={location}
         onChange={(e)=>setLocation(e.target.value)}
         className="select select-lg w-full">
             <option value="" disabled hidden>
        Choose an option
            </option>
            <option value="Khartoum">{t('khartoum')}</option>
            <option value="Portsudan">{t('portsudan')}</option>
        </select>
       </div>)

    const chooseCountryComp = ( <div>
        <label htmlFor="country">{t('chooseCountry')}</label>
         <select  id="country" placeholder="Select country" name="country"
          value={location}
         onChange={(e)=>setLocation(e.target.value)}
         className="select select-lg w-full">
             
            {countryList.map((name,index)=>(
                <option
                value={name}
                key={index}
                >
                    {name}
                </option>
            ))}
        </select>
       </div>)

    return <div className="space-y-10 p-20 lg:max-w-1/2 mx-auto">
        <div role="alert" className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{t('locationInstruction')}</span>
        </div>
        {error && <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
        </div>}

       <div>
        <label htmlFor="stay">{t('whereToReceive')}</label>
         <select name="stay" id="stay" value={inSudan} 
         onChange={(e)=>setInSudan(e.target.value)}
         className="select select-lg w-full">
             <option value="" disabled hidden>
        Choose an option
            </option>
            <option value="sudan">{t('inSudan')}</option>
            <option value="outside">{t('outsideSudan')}</option>
        </select>
       </div> 

        {inSudan==='sudan'? inSudan&&chooseStateComp: inSudan&&chooseCountryComp}
      
       
      
    </div>
}