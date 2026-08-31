import {BrowserRouter, Routes, Route} from "react-router-dom"
import JobsPage from "../pages/JobsPage"
import LoginPage from "../pages/LoginPage"
import MainLayout from "../layouts/MainLayout"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import DashboardPage  from "../pages/DashboardPage"
import RoleRoute from "../components/auth/RoleRoute"

export default function AppRouter() {
  
  return(
    <BrowserRouter>

      <Routes>

         <Route element={<MainLayout />}>

            <Route
               path="/"
               element={<JobsPage />}
            />
            
            <Route
               path="/jobs"
               element={<JobsPage />}
            />

            <Route
               path="/login"
               element={<LoginPage />}
            />

            <Route element={<ProtectedRoute />}>

               <Route
                  path="/dashboard"
                  element={<DashboardPage />}
               />

            </Route>

            {/* <Route element={<RoleRoute allowedRoles={["CANDIDATE"]}/>}>

               <Route path="/candidate/applications"
                      element={<CandidateApplicationsPage />}
               />

            </Route>

            <Route element={<RoleRoute allowedRoles={["EMPLOYER"]}/>}>

               <Route path="/employer/jobs"
                      element={<EmployerJobsPage />}
               />

            </Route>

            <Route element={<RoleRoute allowedRoles={["ADMIN"]}/>}>

               <Route path="/admin/users"
                      element={<AdminUsersPage />}
               />
               
            </Route> */}

         </Route>

      </Routes>

   </BrowserRouter>
  )

}