import { useEffect, useState } from "react"
import { Organizer } from "../application/Orgnizer"

export function Home(){

    const [inApplication, setInApplication]= useState(false)

    useEffect(()=>{
        console.log({inApplication})
    },[inApplication])

    return(
        <div>
            <h1>Passport Renewal Service</h1>

            {inApplication && <Organizer inApplication={inApplication}/> }


            <div className="container center">
                <button className="call-to-action" onClick={()=>setInApplication(true)}>Create Application</button>
                
            </div>
        </div>
    )
}