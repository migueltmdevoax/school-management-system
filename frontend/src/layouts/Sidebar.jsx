import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import {
  logout,
} from "../features/auth/authSlice";

import {
  disconnectSocket,
} from "../services/socket/socketClient";

import {
  useAppSelector,
} from "../hooks/useAppSelector";

import NotificationBell
from "../features/notifications/components/NotificationBell";



export default function Sidebar() {

  // 🟣 REDUX
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const location =
    useLocation();



  // 🟣 AUTH
  const {
    user,
  } = useAppSelector(
    (state) => state.auth
  );



  // 🟣 ROLE ACCESS
  const canManageAcademic = true;




  // 🟣 ACTIVE LINK STYLES
  const linkClass =
    ({ isActive }) => `
      transition-all
      duration-200
      rounded-xl
      px-4
      py-3
      font-medium
      flex
      items-center
      gap-3

      ${
        isActive

          ? `
            bg-blue-600
            text-white
            shadow-lg
          `

          : `
            text-gray-300
            hover:bg-gray-800
            hover:text-white
          `
      }
    `;




  // 🟣 LOGOUT
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

      {/* 🟣 TOP */}
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





        {/* 🔔 NOTIFICATIONS */}
        <div className="
          flex
          justify-end
          mb-6
        ">

          <NotificationBell />

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

            {user?.role}

          </p>

        </div>





        {/* 🔥 NAVIGATION */}
        <nav className="
          flex
          flex-col
          gap-6
        ">

          {/* 🟣 CORE */}
          <div className="space-y-2">

            <p className="
              text-gray-500
              text-xs
              uppercase
              tracking-widest
              px-2
            ">
              Core
            </p>

            <NavLink
              to="/app/dashboard"
              className={linkClass}
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/app/students"
              className={linkClass}
            >
              🎓 Students
            </NavLink>

            <NavLink
              to="/app/teachers"
              className={linkClass}
            >
              👨‍🏫 Teachers
            </NavLink>

          </div>





          {/* 🟣 OPERATIONS */}
          {canManageAcademic && (

            <div className="space-y-2">

              <p className="
                text-gray-500
                text-xs
                uppercase
                tracking-widest
                px-2
              ">
                Operations
              </p>

              <NavLink
                to="/app/teacher/dashboard"
                className={linkClass}
              >
                🔥 Teacher Dashboard
              </NavLink>


              {/* ASSIGNMENTS */}
              <NavLink
                to="/app/assignments"
                className={linkClass}
              >
                📚 Assignments
              </NavLink>


              <NavLink
                to="/app/grades"
                className={linkClass}
              >
                📝 Grades
              </NavLink>

              <NavLink
                to="/app/parents"
                className={linkClass}
              >
                👨‍👩‍👧 Parents
              </NavLink>

            </div>

          )}

        </nav>

      </div>






      {/* 🟣 BOTTOM */}
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