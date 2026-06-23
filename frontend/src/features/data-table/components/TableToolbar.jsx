export default function TableToolbar({ search, setSearch }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-white outline-none w-full max-w-sm" />
    </div>
  );
}