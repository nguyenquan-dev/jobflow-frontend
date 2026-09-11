import {BrowserRouter, Routes, Route} from "react-router-dom"
import JobsPage from "../pages/JobsPage"
import LoginPage from "../pages/LoginPage"
import MainLayout from "../layouts/MainLayout"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import DashboardPage  from "../pages/DashboardPage"
import RoleRoute from "../components/auth/RoleRoute"
import JobDetailPage from "../pages/JobDetailPage"
import MyApplicationsPage from "../pages/MyApplicationPage"
import EmployerJobsPage from "../pages/EmployerJobsPage"
import CreateJobPage from "../pages/CreateJobPage"
import CandidateRegisterPage from "../pages/CandidateRegisterPage"
import EmployerRegisterPage from "../pages/EmployerRegisterPage"
import UpdateJobPage from "../pages/UpdateJobPage"
import RegisterPage from "../pages/RegisterPage"
import EmployerApplicationsForJobPage from "../pages/EmployerApplicationsForJobPage"
import EmployerAllApplicationsPage from "../pages/EmployerAllApplicationsPage"
import AdminUsersPage from "../pages/AdminUsersPage"
import AdminJobsPage from "../pages/AdminJobsPage"

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
               path="/jobs/:jobId"
               element={<JobDetailPage />}
            />

            <Route
               path="/register"
               element={<RegisterPage />}
            />

            <Route
               path="/register/candidate"
               element={<CandidateRegisterPage />}
            />

               <Route
               path="/register/employer"
               element={<EmployerRegisterPage />}
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

            <Route element={<RoleRoute allowedRoles={["EMPLOYER"]}/>}>

               <Route
                  path="/employer/jobs/:jobId/edit"
                  element={<UpdateJobPage />}
               />

            </Route>

            <Route element={<RoleRoute allowedRoles={["CANDIDATE"]}/>}>

               <Route path="/candidate/applications"
                      element={<MyApplicationsPage />}
               />

            </Route>

            <Route element={<RoleRoute allowedRoles={["EMPLOYER"]}/>}>

               <Route path="employer/jobs/:jobId/applications"
                      element={<EmployerApplicationsForJobPage />}
               />

            </Route>

            <Route element={<RoleRoute allowedRoles={["EMPLOYER"]}/>}>

               <Route
                  path="/employer/jobs"
                  element={<EmployerJobsPage />}
               />

                <Route
                  path="/employer/applications"
                  element={<EmployerAllApplicationsPage />}
               />

               <Route
                  path="/employer/jobs/new"
                  element={<CreateJobPage />}
               />

            </Route>

            <Route element={<RoleRoute allowedRoles={["ADMIN"]}/>}>

               <Route
                  path="/admin/users"
                  element={<AdminUsersPage />}
               />

                <Route
                  path="/admin/jobs"
                  element={<AdminJobsPage  />}
               />

               {/* <Route
                  path="/admin/reports"
                  element={<CreateJobPage />}
               /> */}

            </Route>

         </Route>

      </Routes>

   </BrowserRouter>
  )

}