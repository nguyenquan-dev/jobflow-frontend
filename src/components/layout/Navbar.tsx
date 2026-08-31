import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar(){

  const {user, isAuthenticated, logout} = useAuth();

  return (
    <nav className="border-b">

      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">

        <Link
          to="/jobs"
          className="text-xl font-bold"
        >
          JobFlow
        </Link>

        <div className="flex items-center gap-4">

          <Link to="/jobs">
            Jobs
          </Link>

          {isAuthenticated ? (
            <>
              <span>
                {user?.email}
              </span>

              <Link to="/dashboard">
                Dashboard
              </Link>

              <button onClick={logout}>
                Logout  
              </button>
            </>

          ) : (

            <Link to="/login">
              Login
            </Link>

          )}

        </div>

      </div>

    </nav>
  );

}