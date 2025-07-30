import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from './AuthContext'
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Loading } from "../components/Loading";

export function Register(){
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState("")

    const {register} = useAuth()
    const navigate = useNavigate()


    const [username, setUsername] = useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


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
                document.getElementById('success-modal').showModal()
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
        {loading ? <Loading /> : (
        <div className="w-full max-w-md mx-auto mt-10 sm:mt-20 p-6 sm:p-10 bg-blue-50 rounded-2xl shadow-2xl border-[0.5px] border-blue-300 text-black">
            <h1 className="text-3xl sm:text-5xl mb-5 font-bold text-center">{t('register')}</h1>
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
        )}
        <dialog id="success-modal" className="modal">
            <div className="modal-box bg-green-600 text-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <h3 className="font-bold text-lg">{t('registrationSuccessful')}</h3>
                <p className="py-4">{t('youWillBeRedirected')}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => navigate('/home')}>{t('close')}</button>
            </form>
        </dialog>
        </>
    )
}