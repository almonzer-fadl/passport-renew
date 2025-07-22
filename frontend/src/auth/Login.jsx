import { useState , useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from './AuthContext'

export function Login(){
    const [loading, setLoading] = useState(false)
    const [error , setError] = useState("")

    const {login, isAuthenticated} = useAuth()
    const navigate = useNavigate()


    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")


    useEffect(()=>{
        if(isAuthenticated){
            navigate('/home')
        }
    },[isAuthenticated, navigate])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');


        if(password.length <6){
            setError("Password must be at least 6 characters")
            return
        }
       
        setLoading(true)

        try{
            const result = await login(email, password)
            if(result.success){
                console.log("Login successful")
            }else{
                setError(result.message)
            }
        }
        catch(error){
            setError("Something went wrong, please try again")
            return
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
        {error? alert(error):null}

        <div className="min-w-120 min-h-100  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 rounded-2xl p-10 flex-col justify-center align-middle  border-dashed border-2 border-blue-300 text-black">
            <h1
            className="text-5xl mb-5 font-bold">Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"
                    >Email</label>
                    <input type="email"
                    className="border-1 rounded-md p-2 text-lg mb-3 w-full"
                     placeholder="Email"
                     maxLength={20}
                     minLength={4}
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     />
                </div> 
                <div >
                    <label htmlFor="password">Password</label>
                    <input type="password"
                     placeholder="Password"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full"

                     maxLength={20}
                     minLength={6}
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     />
                </div>
                
                <div className="flex justify-center align-middle">

                <button className="p-2 pl-20 pr-20 bg-blue-600 text-white text-2xl rounded-4xl m-5" type="submit">Login</button>
                </div>
            </form>
            <p>Don't have an account? <Link to="/register" className="text-blue-700">Register</Link></p>
        </div>
        </>
    )
}