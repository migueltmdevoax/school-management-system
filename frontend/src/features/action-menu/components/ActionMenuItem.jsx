export default function ActionMenuItem({ children, onClick, danger = false }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition-all ${
        danger ? "text-red-400 hover:bg-red-500/10" : "text-gray-300 hover:bg-gray-800"
      }`}>
      {children}
    </button>
  );
}