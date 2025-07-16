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

        <div className="container center self-center-main">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="no-flex">
                    <label htmlFor="emali">Email</label>
                    <input type="email"
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
                     placeholder="Password"
                     maxLength={20}
                     minLength={6}
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     />
                </div>
                
                <div className="no-flex">

                <button className="call-to-action" type="submit">Login</button>
                </div>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
        </>
    )
}