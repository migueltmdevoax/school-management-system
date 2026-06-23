export default function NotificationItem({ notification }) {
  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-900 transition-all cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold">{notification.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
        </div>
        {!notification.is_read && (
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
        )}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        {new Date(notification.created_at).toLocaleTimeString()}
      </p>
    </div>
  );
}