import { useState, useRef, useEffect } from "react";
import { useNavigate }                  from "react-router-dom";
import { useDispatch }                  from "react-redux";
import {
  useGetMyNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllAsReadMutation,
} from "../notificationsApi";
import { apiSlice } from "../../../app/api/apiSlice";

const TYPE_CONFIG = {
  incident:  { icon: "🚨", color: "text-red-400",    bg: "bg-red-500/10",    route: "/app/incidents"   },
  payment:   { icon: "💰", color: "text-yellow-400", bg: "bg-yellow-500/10", route: "/app/payments"    },
  grade:     { icon: "📝", color: "text-blue-400",   bg: "bg-blue-500/10",   route: "/app/grades"      },
  assignment:{ icon: "📚", color: "text-purple-400", bg: "bg-purple-500/10", route: "/app/assignments" },
  default:   { icon: "🔔", color: "text-gray-400",   bg: "bg-gray-500/10",   route: null               },
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  const now  = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60)    return "Just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString("es-MX", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
};

export default function NotificationBell() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { data, refetch } = useGetMyNotificationsQuery(undefined, {
    pollingInterval: 30000,
  });

  const [markAsRead]    = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const notifications = Array.isArray(data?.data) ? data.data : [];
  const unread        = notifications.filter((n) => !n.is_read).length;

  // Cierra al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = async (notification) => {
    if (!notification.is_read) {
      await markAsRead(notification.id);
    }
    const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.default;
    if (config.route) navigate(config.route);
    setOpen(false);
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    dispatch(apiSlice.util.invalidateTags(["Notifications"]));
  };

  return (
    <div className="relative mr-2" ref={ref}>

      {/* 🔔 BELL BUTTON */}
      <button
        onClick={() => { setOpen(!open); if (!open) refetch(); }}
        className="relative bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-all rounded-xl p-3"
      >
        <span className="text-xl">🔔</span>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-black rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {/* 📋 DROPDOWN */}
      {open && (
        <div
  className="fixed w-80 bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl z-[99999] overflow-hidden flex flex-col"
  style={{
    maxHeight: "min(320px, calc(100vh - 160px))",
    top: "60px",
    left: "300px", // ajusta este valor según el ancho de tu sidebar/header
  }}
>
          {/* HEADER — fijo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800 shrink-0">
            <div>
              <h3 className="text-white font-bold">Notifications</h3>
              <p className="text-gray-500 text-xs mt-0.5">
                {unread > 0 ? `${unread} unread` : "All caught up"}
              </p>
            </div>
            {unread > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-blue-400 hover:text-blue-300 text-xs font-semibold transition"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* LIST — scrolleable */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-3xl mb-2">🔕</p>
                <p className="text-gray-400 text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 20).map((n) => {
                const config = TYPE_CONFIG[n.type] || TYPE_CONFIG.default;
                return (
                  <button
                    key={n.id}
                    onClick={() => handleClick(n)}
                    className={`w-full text-left p-4 border-b border-gray-800/50 hover:bg-gray-900 transition flex gap-3 items-start ${
                      !n.is_read ? "bg-gray-900/50" : ""
                    }`}
                  >
                    {/* ICON */}
                    <div className={`w-9 h-9 rounded-2xl ${config.bg} flex items-center justify-center shrink-0`}>
                      <span className="text-base">{config.icon}</span>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-semibold truncate ${!n.is_read ? "text-white" : "text-gray-300"}`}>
                          {n.title}
                        </p>
                        {!n.is_read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        🕐 {formatTime(n.created_at)}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* FOOTER — fijo */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-800 text-center shrink-0">
              <button
                onClick={() => { navigate("/app/notifications"); setOpen(false); }}
                className="text-blue-400 hover:text-blue-300 text-xs font-semibold transition"
              >
                View all notifications →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}