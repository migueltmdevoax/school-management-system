import { Navigate }    from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleBasedRedirect() {
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (role === "admin")   return <Navigate to="/app/admin/dashboard"   replace />;
  if (role === "teacher") return <Navigate to="/app/teacher/dashboard" replace />;
  if (role === "parent")  return <Navigate to="/app/parent/dashboard"  replace />;

  return <Navigate to="/login" replace />;
}