import { MoreVertical } from "lucide-react";
import { useActionMenu } from "../hooks/useActionMenu";

export default function ActionMenu({ children }) {
  const { open, setOpen, menuRef } = useActionMenu();
  return (
    <div ref={menuRef} className="relative">
      <button onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-800 transition-all">
        <MoreVertical size={18} className="text-gray-400" />
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-52 bg-gray-950 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50">
          {children}
        </div>
      )}
    </div>
  );
}