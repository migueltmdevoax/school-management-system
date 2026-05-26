import { useMemo } from "react";

import {
  useDispatch,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  logout,
} from "../features/auth/authSlice";

import {
  disconnectSocket,
} from "../services/socket/socketClient";

import {
  useAppSelector,
} from "../hooks/useAppSelector";

import AdminSidebar
from "./sidebars/AdminSidebar";

import TeacherSidebar
from "./sidebars/TeacherSidebar";

import ParentSidebar
from "./sidebars/ParentSidebar";



export default function Sidebar() {

  // 🔥 REDUX
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();



  // 🔥 AUTH
  const {
    user,
  } = useAppSelector(
    (state) => state.auth
  );



  // 🔥 LOGOUT
  const handleLogout =
    () => {

      try {

        disconnectSocket();

        dispatch(
          logout()
        );

        navigate(
          "/login"
        );

      } catch (error) {

        console.error(
          "❌ Logout error:",
          error
        );
      }
    };




  // 🔥 ROLE ENGINE
  const role =
    user?.role?.toLowerCase();




  // 🔥 SIDEBAR SWITCHER
  const SidebarComponent =
    useMemo(() => {

      switch (role) {

        case "admin":
          return AdminSidebar;

        case "teacher":
          return TeacherSidebar;

        case "parent":
          return ParentSidebar;

        default:
          return AdminSidebar;

      }

    }, [role]);




  return (

    <aside className="
      flex
      flex-col
      justify-between
      h-screen
      w-[290px]
      shrink-0
      bg-gray-950
      border-r
      border-gray-800
      p-5
    ">

      {/* 🔥 TOP */}
      <div>

        {/* 🔥 LOGO */}
        <div className="mb-10">

          <h1 className="
            text-2xl
            font-black
            text-white
            tracking-tight
          ">
            🎓 Sistema Escolar
          </h1>

          <p className="
            text-gray-400
            text-sm
            mt-1
          ">
            Enterprise SaaS Platform
          </p>

        </div>




        {/* 🔥 USER CARD */}
        <div className="
          bg-gray-900
          border
          border-gray-800
          rounded-2xl
          p-4
          mb-8
        ">

          <p className="
            text-gray-500
            text-xs
            uppercase
            tracking-widest
            mb-2
          ">
            Active Session
          </p>

          <h3 className="
            text-white
            font-bold
            truncate
          ">

            {user?.email || "Usuario"}

          </h3>

          <p className="
            text-blue-400
            text-sm
            mt-1
            capitalize
          ">

            {role}

          </p>

        </div>




        {/* 🔥 DYNAMIC SIDEBAR */}
        <SidebarComponent />

      </div>




      {/* 🔥 BOTTOM */}
      <div>

        <button

          onClick={handleLogout}

          className="
            w-full
            bg-red-600
            hover:bg-red-700
            active:scale-[0.98]
            transition-all
            duration-200
            text-white
            py-3
            rounded-xl
            font-semibold
            shadow-lg
          "
        >

          🔴 Cerrar sesión

        </button>

      </div>

    </aside>
  );
}