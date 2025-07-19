import { useContext, useEffect, useState } from "react"
import { Organizer } from "../application/Orgnizer"
import {organizerContext} from '../App'
import { useNavigate } from "react-router-dom"

export function Home(){

    const navigate = useNavigate()

    return(
        <div>
            <h1>Passport Renewal Service</h1>
            <div className="container center">
                <button className="call-to-action" onClick={()=>{navigate('/application')}}>Create Application</button>
                
            </div>
        </div>
    )
}