import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useAppSelector,
} from "../hooks/useAppSelector";



export default function ProtectedRoute() {

  // 🔥 AUTH
  const {
    token,
    user,
  } = useAppSelector(
    (state) => state.auth
  );



  // 🔥 NO SESSION
  if (!token || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }



  // 🔥 AUTHORIZED
  return <Outlet />;
}