import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useUser";

const RouteProtection:React.FC = () => {
    const {user} = useUser();
    console.log("ROUTE PROTECTION",user)
    if(!user?.id) return <Navigate to={'/auth/login'} replace/>
    return <Outlet/>;
}

export default RouteProtection;