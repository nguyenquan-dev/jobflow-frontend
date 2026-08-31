import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../types/auth";

interface RoleRouteProps{
  allowedRoles: UserRole[];
}

export default function RoleRoute({allowedRoles}: RoleRouteProps){
  const {user, isAuthenticated, isLoading} = useAuth();

  if(isLoading){
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if(!isAuthenticated){
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if(!user || !allowedRoles.includes(user.role)){
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}