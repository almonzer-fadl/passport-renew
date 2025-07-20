import { useContext, useEffect, useState } from "react"
import { Organizer } from "../application/Orgnizer"
import {organizerContext} from '../App'
import { useNavigate } from "react-router-dom"
import logoutIcon from "../assets/logout.svg"
import {useAuth} from "./AuthContext"

export function Home(){

    const navigate = useNavigate()
    const {logout} = useAuth()

    return(
        <div>
            <header className="bg-blue-800 text-white text-4xl font-bold p-5 flex justify-between align-middle">

            <h1 className="text-center"> Passport Renewal Service</h1>
            <button className="w-10 h-10 flex justify-center align-middle cursor-pointer" onClick={logout}><img  src={logoutIcon} alt="logout icon"></img></button>
            </header>
            <div className=" text-gray-950 flex justify-center align-middle h-full m-10 p-10 border-2 border-gray-400 border-dashed dash rounded-2xl">
                <button className="btn btn-primary" onClick={()=>{navigate('/application')}}>Start New Application</button>
                
            </div>
        </div>
    )
}