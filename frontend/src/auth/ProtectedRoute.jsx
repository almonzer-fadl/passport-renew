import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({children}){
    const {isAuthenticated, loading} = useAuth()

    if (loading) {
        return <div>Loading...</div>;
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    if(isAuthenticated && window.location.pathname === '/'){
        return <Navigate to="/home" replace />;
    }
    return children
}