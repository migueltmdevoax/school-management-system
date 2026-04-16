import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useLocation } from "react-router-dom"



export default function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()
    console.log("PATH:", location.pathname)
  return (
    <aside className="sidebar">
      <h2>Sistema Escolar</h2>

      <nav className="sidebar-nav">
       <NavLink
         to="/"
         end
         className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
       >
         Dashboard
       </NavLink>

       <NavLink
         to="/students"
         className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
       >
         Alumnos
       </NavLink>

       <NavLink
         to="/teachers"
         className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
       >
         Maestros
       </NavLink>


       {["admin", "teacher"].includes(user?.role) && (
       <NavLink
         to="/admissions"
         className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
       >
         Admisión
       </NavLink>
       )}
      </nav>
    </aside>
  );
}