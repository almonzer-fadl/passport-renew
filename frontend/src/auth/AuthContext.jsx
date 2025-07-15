/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer, useEffect } from "react"

const AuthContext = createContext()

const initialState = {
    isAuthenticated: false,
    user:null,
    token:null,
    loading:true
}

const authReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                isAuthenticated:true,
                user:action.payload.user,
                token: action.payload.token,
                loading:false
            }
        case 'LOGOUT':
            return{
                ...state,
                isAuthenticated:false,
                user:null,
                token:null,
                loading:true
            }
        case 'AUTH_ERROR':
            return{
                ...state,
                isAuthenticated:false,
                user:null,
                token:null,
                loading:true
            }
        case 'SET_LOADING':
            return{
                ...state,
                loading:action.payload
            }
        default:
            return state
    }
}

export const AuthProvider = ({children})=>{
    const [state, dispatch] = useReducer(authReducer, initialState)
    
     useEffect(()=>{
        checkAuthStatus()
    },[])

    const checkAuthStatus = async()=>{
        try{
            const token = localStorage.getItem('token')
            if(!token){
                dispatch({type:'SET_LOADING', payload:false})
                return
            }
            const response = await fetch('http://localhost:5000/api/verify-token',
                {
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            if (response.ok) {
                const data = await response.json();
                dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: data.user,
                    token: token
          }
        })
      }else{
        localStorage.removeItem('token')
        dispatch({type:'AUTH_ERROR'})
      }
        }catch(error){
            console.log(error);
            localStorage.removeItem('token')
            dispatch({type:'AUTH_ERROR'}) 
        }

    }

    const register = async(username, email, password)=>{
        try{
            const response = await fetch('http://localhost:5000/api/register', {
                method:"POST",
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({username:username,email:email,password:password})
            })
            console.log(JSON.stringify({username:username,email:email,password:password}))

            const data = await response.json()
            if(response.ok){
                localStorage.setItem('token', data.token)
                dispatch({
                    type:"LOGIN_SUCCESS",
                    payload:{
                        user:data.user,
                        token: data.token
                    }
                })
                return {success:true, message: data.message}
            }else{
                return {success:false, message: data.message}
            }
        }catch(error){
            console.log('Registeration error', error)
            return {success:false, message: "Network error occured"}
           
        }
    }

     const login = async(email, password)=>{
        try{
            const response = await fetch('http://localhost:5000/api/login', {
                method:"POST",
                headers:{
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({email,password})
            })

            const data = await response.json()
            if(response.ok){
                localStorage.setItem('token', data.token)
                dispatch({
                    type:"LOGIN_SUCCESS",
                    payload:{
                        user:data.user,
                        token: data.token
                    }
                })
                return {success:true, message: data.message}
            }else{
                return {success:false, message: data.message}
            }
        }catch(error){
            console.log('Registeration error', error)
            return {success:true, message: "Network error occured"}
           
        }
    }
     const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    console.log("logged out successfully");
    
  };

   const value = {
    ...state,
    login,
    register,
    logout,
    checkAuthStatus
  };

   return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
    
   
