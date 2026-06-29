import NotificationItem from "./NotificationItem";

export default function NotificationDropdown({ notifications }) {
  return (
    <div className="fixed top-24 left-[310px] w-[380px] max-h-[500px] overflow-y-auto bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl z-[9999]">
      <div className="p-4 border-b border-gray-800 sticky top-0 bg-gray-950 z-10">
        <h2 className="text-white font-bold text-lg">🔔 Notificaciones</h2>
      </div>
      {notifications.length === 0 ? (
        <div className="p-10 text-center text-gray-500">Sin notificaciones</div>
      ) : (
        <div className="flex flex-col">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      )}
    </div>
  );
}