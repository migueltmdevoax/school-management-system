import { useSelector, useDispatch } from "react-redux";
import { toggleNotificationsCenter, clearNotifications } from "../notificationsCenterSlice";
import NotificationItem from "./NotificationItem";

export default function NotificationsCenter() {
  const dispatch = useDispatch();
  const { open, items } = useSelector((s) => s.notificationsCenter);

  if (!open) return null;

  return (
    <div className="fixed right-6 top-20 z-[9999] w-[420px] rounded-3xl border border-gray-800 bg-gray-950 shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-800 p-5">
        <h2 className="text-lg font-bold text-white">Notifications</h2>
        <button
          onClick={() => dispatch(clearNotifications())}
          className="text-sm text-gray-400 hover:text-white"
        >
          Clear
        </button>
      </div>
      <div className="max-h-[500px] space-y-3 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No notifications</p>
        ) : (
          items.map((n) => <NotificationItem key={n.id} notification={n} />)
        )}
      </div>
    </div>
  );
}