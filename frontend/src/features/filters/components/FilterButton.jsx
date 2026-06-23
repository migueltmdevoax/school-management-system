export default function FilterButton({ active, children, onClick }) {
  return (
    <button onClick={onClick}
      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${
        active ? "bg-indigo-500 text-white" : "bg-gray-900 text-gray-400 hover:bg-gray-800"
      }`}>
      {children}
    </button>
  );
}