
import { useState } from "react"
import { countryList } from "./Countries"

export function Location(props){

    const [inSudan, setInSudan] = props.inSudan
    const [location ,setLocation] = props.location


    const chooseStateComp = ( <div>
        <label htmlFor="state">Choose state</label>
         <select name="state" id="state" 
         value={location}
         onChange={(e)=>setLocation(e.target.value)}
         className="border-1 rounded-md p-2 text-lg mb-3 w-full">
             <option value="" disabled hidden>
        Choose an option
            </option>
            <option value="Khartoum">Khartoum</option>
            <option value="Portsudan">Portsudan</option>
        </select>
       </div>)

    const chooseCountryComp = ( <div>
        <label htmlFor="country">Choose Country</label>
         <select  id="country" placeholder="Select country" name="country"
          value={location}
         onChange={(e)=>setLocation(e.target.value)}
         className="border-1 rounded-md p-2 text-lg mb-3 w-full">
             
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

    return <div className="space-y-10 p-10">

       <div>
        <label htmlFor="stay">Where do you want to recieve the passport?</label>
         <select name="stay" id="stay" value={inSudan} 
         onChange={(e)=>setInSudan(e.target.value)}
         className="border-1 rounded-md p-2 text-lg mb-3 w-full">
             <option value="" disabled hidden>
        Choose an option
            </option>
            <option value="sudan">In Sudan</option>
            <option value="outside">Outside Sudan</option>
        </select>
       </div> 

        {inSudan==='sudan'? inSudan&&chooseStateComp: inSudan&&chooseCountryComp}
      
       
      
    </div>
}