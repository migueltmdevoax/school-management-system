import { useEffect } from "react";

const typeStyles = {
  success: "border-green-500/30 bg-green-500/10",
  error:   "border-red-500/30   bg-red-500/10",
  warning: "border-yellow-500/30 bg-yellow-500/10",
  info:    "border-blue-500/30  bg-blue-500/10",
};

const iconMap = {
  success: "✅",
  error:   "❌",
  warning: "⚠️",
  info:    "ℹ️",
};

export default function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onClose]);

  return (
    <div className={`
      min-w-[320px] max-w-sm
      rounded-2xl border shadow-2xl p-4
      bg-gray-950 border-gray-800
      animate-in slide-in-from-right-5
      ${typeStyles[toast.type] || typeStyles.info}
    `}>
      <div className="flex items-start gap-3">
        <span className="text-lg shrink-0">{iconMap[toast.type] || "ℹ️"}</span>
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h3 className="text-white font-bold text-sm truncate">{toast.title}</h3>
          )}
          {toast.message && (
            <p className="text-gray-400 text-sm mt-1">{toast.message}</p>
          )}
        </div>
        <button
          onClick={() => onClose(toast.id)}
          className="text-gray-500 hover:text-white shrink-0 text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}