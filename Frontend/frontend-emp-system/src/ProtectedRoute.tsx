import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  role?: string; // optional, only required if a role restriction is needed
};

export default function ProtectedRoute({ role }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based restriction
  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
