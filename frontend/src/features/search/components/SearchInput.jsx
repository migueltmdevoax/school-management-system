export default function SearchInput({ value, onChange }) {
  return (
    <input
      autoFocus
      value={value}
      onChange={onChange}
      placeholder="Buscar estudiantes..."
      className="w-full rounded-2xl border border-gray-800 bg-gray-900 px-5 py-4 text-white outline-none transition-all focus:border-indigo-500"
    />
  );
}