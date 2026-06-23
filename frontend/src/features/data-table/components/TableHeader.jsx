export default function TableHeader({ columns = [], onSort, sortKey, direction }) {
  return (
    <thead>
      <tr className="border-b border-gray-800">
        {columns.map((col) => (
          <th key={col.key} onClick={() => onSort(col.key)}
            className="text-left p-4 text-gray-300 cursor-pointer select-none text-sm font-semibold">
            {col.label}
            {sortKey === col.key && <span className="ml-2">{direction === "asc" ? "↑" : "↓"}</span>}
          </th>
        ))}
      </tr>
    </thead>
  );
}