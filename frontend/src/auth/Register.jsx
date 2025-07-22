import { useState , useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from './AuthContext'

export function Register(){
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
            setError("Password must be at least 6 characters")
            return
        }
        if(password !== confirmPassword){
            setError("Passwords do not match")
            return
        }

        setLoading(true)

        try{
            const result = await register(username, email, password)
            if(result.success){
                console.log("Registeration successful")
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

        <div className="text-black min-w-120 min-h-100  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 rounded-2xl p-10 flex-col justify-center align-middle  border-dashed border-2 border-blue-300">
            <h1 className="text-5xl mb-5 font-bold">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="no-flex">
                    <label htmlFor="username">Username</label>
                    
                    <input type="text"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full"
                     placeholder="Username"
                     maxLength={20}
                     minLength={4}
                     value={username}
                     onChange={(e)=>setUsername(e.target.value)}
                     />
                </div> <div className="no-flex">
                    <label htmlFor="emali">Email</label>
                    <input type="email"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full"
                     placeholder="Email"
                     maxLength={20}
                     minLength={4}
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     />
                </div> 
                <div className="no-flex">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full"
                     placeholder="Password"
                     maxLength={20}
                     minLength={6}
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     />
                </div>
                 <div className="no-flex">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password"
                     className="border-1 rounded-md p-2 text-lg mb-3 w-full"
                     placeholder="Confirm Password"
                     maxLength={20}
                     minLength={6}
                     value={confirmPassword}
                     onChange={(e)=>setConfirmPassword(e.target.value)}
                     />
                </div>
                <div className="no-flex">

                <button className="p-2 pl-20 pr-20 bg-blue-600 text-white text-2xl rounded-4xl m-5"type="submit">Register</button>
                </div>
            </form>
            <p>Already have an account? <Link className="text-blue-700" to="/login">Login</Link></p>
        </div>
        </>
    )
}