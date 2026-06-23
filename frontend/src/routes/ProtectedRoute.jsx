import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector }                from "../hooks/useAppSelector";

export default function ProtectedRoute() {
  const { token, isAuthenticated } = useAppSelector((s) => s.auth);
  const location = useLocation();

  if (!token || !isAuthenticated) {
    // Guarda la ruta a la que intentaba ir para redirigir después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}