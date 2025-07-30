import { useContext, useEffect, useState } from "react"
import { Organizer } from "./application/Orgnizer"
import {organizerContext} from './App'
import { useNavigate } from "react-router-dom"
import logoutIcon from "./assets/logout.svg"
import {useAuth} from "./auth/AuthContext"
import {UserDashboard} from './components/user-dashboard-list'
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "./components/LanguageSwitcher"

export function Home(){
    const { t } = useTranslation();
    const navigate = useNavigate()
    const {logout} = useAuth()

    return(
        <div className="bg-white min-h-dvh">
            <header className="bg-blue-800 text-white text-4xl font-bold p-5 flex justify-between align-middle">

            <h1 className="text-center">{t('passportRenewalService')}</h1>
            <div className="flex space-x-4">
              <LanguageSwitcher />
              <button className="w-10 h-10 flex justify-center align-middle cursor-pointer" onClick={logout}><img  src={logoutIcon} alt="logout icon"></img></button>
            </div>
            </header>
            <div className=" text-gray-950 flex justify-center align-middle h-full m-10 p-10 border-2 border-gray-400 border-dashed dash rounded-2xl">
                <button className="btn btn-primary" onClick={()=>{navigate('/application')}}>{t('startNewApplication')}</button>
            </div>
            
                
            <UserDashboard/>

            
        </div>
    )
}