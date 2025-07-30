import { useState , useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from './AuthContext'
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function Register(){
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState("")

    const {register, isAuthenticated} = useAuth()
    const navigate = useNavigate()


    const [username, setUsername] = useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    useEffect(()=>{
        if(isAuthenticated){
            navigate('/home')
        }
    },[isAuthenticated, navigate])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');


        if(password.length <6){
            setError(t('passwordTooShort'))
            return
        }
        if(password !== confirmPassword){
            setError(t('passwordsDoNotMatch'))
            return
        }

        setLoading(true)

        try{
            const result = await register(username, email, password)
            if(result.success){
                console.log(t('registrationSuccessful'))
            }else{
                setError(result.message)
            }
        }
        catch(error){
            setError(t('somethingWentWrong'))
            return
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
        {error? alert(error):null}
        <LanguageSwitcher />

        <div className="min-w-120 min-h-100  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-50 rounded-2xl p-10 flex-col justify-center align-middle shadow-2xl border-[0.5px]  border-blue-300 text-black">
            <h1 className="text-5xl mb-5 font-bold">{t('register')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="no-flex">
                    <label htmlFor="username">{t('username')}</label>
                    
                    <input type="text"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full  input input-xl"
                     placeholder={t('username')}
                     maxLength={20}
                     minLength={4}
                     value={username}
                     onChange={(e)=>setUsername(e.target.value)}
                     />
                </div> <div className="no-flex">
                    <label htmlFor="emali">{t('email')}</label>
                    <input type="email"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full input input-xl"
                     placeholder={t('email')}
                     maxLength={20}
                     minLength={4}
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     />
                </div> 
                <div className="no-flex">
                    <label htmlFor="password">{t('password')}</label>
                    <input type="password"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full input input-xl"
                     placeholder={t('password')}
                     maxLength={20}
                     minLength={6}
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     />
                </div>
                 <div className="no-flex">
                    <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                    <input type="password"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full input input-xl"
                     placeholder={t('confirmPassword')}
                     maxLength={20}
                     minLength={6}
                     value={confirmPassword}
                     onChange={(e)=>setConfirmPassword(e.target.value)}
                     />
                </div>
                <div className="no-flex">

                <button className="btn btn-xl btn-block btn-primary my-5"type="submit">{t('register')}</button>
                </div>
            </form>
            <p>{t('alreadyHaveAccount')} <Link className="text-blue-700" to="/login">{t('login')}</Link></p>
        </div>
        </>
    )
}