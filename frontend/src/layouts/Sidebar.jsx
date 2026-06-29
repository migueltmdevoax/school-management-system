import { useMemo }     from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout }      from "../features/auth/authSlice";
import { apiSlice }    from "../app/api/apiSlice";
import { disconnectSocket } from "../services/socket/socketClient";
import { useAppSelector }   from "../hooks/useAppSelector";
import AdminSidebar   from "./sidebars/AdminSidebar";
import TeacherSidebar from "./sidebars/TeacherSidebar";
import ParentSidebar  from "./sidebars/ParentSidebar";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((s) => s.auth);
  const role     = user?.role?.toLowerCase();

  const handleLogout = () => {
    try {
      disconnectSocket();
      dispatch(apiSlice.util.resetApiState());
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const SidebarComponent = useMemo(() => {
    switch (role) {
      case "admin":   return AdminSidebar;
      case "teacher": return TeacherSidebar;
      case "parent":  return ParentSidebar;
      default:        return AdminSidebar;
    }
  }, [role]);

  return (
    <aside className="flex flex-col h-screen w-[290px] shrink-0 bg-gray-950 border-r border-gray-800">
      {/* 🔥 HEADER fijo — no scrollea */}
      <div className="p-5 pb-0 shrink-0">
        <div className="mb-10">
          <h1 className="text-2xl font-black text-white tracking-tight">🎓 Solar Juvenil Oaxaqueño</h1>
          <p className="text-gray-400 text-sm mt-1">Plataforma escolar</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Sesion Activa</p>
          <h3 className="text-white font-bold truncate">{user?.email || "User"}</h3>
          <p className="text-blue-400 text-sm mt-1 capitalize">{role}</p>
        </div>
      </div>

      {/* 🔥 FIX: los links viven en su propio contenedor con scroll independiente */}
      <div className="flex-1 overflow-y-auto px-5">
        <SidebarComponent />
      </div>

      {/* 🔥 FOOTER fijo — no scrollea */}
      <div className="p-5 pt-4 shrink-0">
        <button onClick={handleLogout}
          className="w-64 bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all text-white py-1.5 rounded-xl font-semibold shadow-lg">
          🔴 Cerrar sesión
        </button>
      </div>
    </aside>
  );
}