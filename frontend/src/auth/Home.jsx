import { useContext, useEffect, useState } from "react"
import { Organizer } from "../application/Orgnizer"
import {organizerContext} from '../App'

export function Home(){

    const {isOrganizerRunning, setIsOrganizerRunning} = useContext(organizerContext)
    

    return(
        <div>
            <h1>Passport Renewal Service</h1>
            <div className="container center">
                <button className="call-to-action" onClick={()=>setIsOrganizerRunning(true)}>Create Application</button>
                
            </div>
        </div>
    )
}