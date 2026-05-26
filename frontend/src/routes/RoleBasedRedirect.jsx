import { Navigate } from "react-router-dom";

import { useSelector }
from "react-redux";

export default function RoleBasedRedirect() {

  const { role } =
    useSelector(
      (state) => state.auth
    );




  // 🔥 ADMIN
  if (role === "admin") {

    return (
      <Navigate
        to="/app/admin/dashboard"
        replace
      />
    );
  }




  // 🔥 TEACHER
  if (role === "teacher") {

    return (
      <Navigate
        to="/app/teacher/dashboard"
        replace
      />
    );
  }




  // 🔥 PARENT
  if (role === "parent") {

    return (
      <Navigate
        to="/app/parent/dashboard"
        replace
      />
    );
  }




  // 🔥 FALLBACK
  return (
    <Navigate
      to="/login"
      replace
    />
  );
}