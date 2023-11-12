import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({user, redirectPath="/" ,children}) => {
    if(!user){
        return <Navigate to={redirectPath} replace={true} />
    }

    return children ? children : <Outlet />;
}

export default ProtectedRoute;