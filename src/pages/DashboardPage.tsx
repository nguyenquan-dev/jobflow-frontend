import AdminDashboard from "../components/dashboard/AdminDashboard";
import CandidateDashboard from "../components/dashboard/CandidateDashboard";
import EmployerDashboard from "../components/dashboard/EmployerDashboard";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {

  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {

    case "CANDIDATE":
      return <CandidateDashboard />;

    case "EMPLOYER":
      return <EmployerDashboard />;

    case "ADMIN":
      return <AdminDashboard />;

    default:
      return null;
  }
}