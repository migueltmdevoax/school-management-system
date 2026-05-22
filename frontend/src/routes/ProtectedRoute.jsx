import {
  Navigate,
} from "react-router-dom";

import {
  useAppSelector,
} from "../hooks/useAppSelector";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {

  const {
    role,
    isAuthenticated,
  } = useAppSelector(
    (state) => state.auth
  );



  // 🔥 NOT LOGGED
  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }



  // 🔥 ROLE BLOCKED
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role
    )
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }



  return children;
}