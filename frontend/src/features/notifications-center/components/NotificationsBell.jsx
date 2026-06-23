import { useDispatch, useSelector } from "react-redux";
import { toggleNotificationsCenter } from "../notificationsCenterSlice";

export default function NotificationsBell() {
  const dispatch = useDispatch();
  const count = useSelector((s) => s.notificationsCenter.items.length);

  return (
    <button
      onClick={() => dispatch(toggleNotificationsCenter())}
      className="relative rounded-2xl bg-gray-900 p-3 text-xl transition-all hover:bg-gray-800"
    >
      🔔
      {count > 0 && (
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
          {count}
        </div>
      )}
    </button>
  );
}