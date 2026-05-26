import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleRoute({
  children,
  allowedRoles = [],
}) {

  const { user, isAuthenticated, loading } =
    useSelector((state) => state.auth);




  // 🔥 ESPERAR AUTH
  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }




  // 🔥 NO LOGIN
  if (!isAuthenticated || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }




  // 🔥 SIN PERMISOS
  if (
    !allowedRoles.includes(user.role)
  ) {

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }




  // 🔥 TODO OK
  return children;
}