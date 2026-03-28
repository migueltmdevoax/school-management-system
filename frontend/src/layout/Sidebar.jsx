import { NavLink } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Sistema Escolar</h2>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive}) => isActive ? "active" : ""}>
          Dashboard
        </NavLink>

        <NavLink to="/students" className={({ isActive}) => isActive ? "active" : ""}>
          Alumnos
        </NavLink>

        <NavLink to="/teachers" className={({ isActive}) => isActive ? "active" : ""}>
          Maestros
        </NavLink>

        <NavLink to="/admissions" className={({ isActive}) => isActive? "active" : ""}>
        Admisión
        </NavLink>
      </nav>
    </aside>
  );
}