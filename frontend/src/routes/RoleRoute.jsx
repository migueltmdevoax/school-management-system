import { Navigate }    from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated } = useSelector((s) => s.auth);

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) return <Navigate to="/app" replace />;

  return children;
}