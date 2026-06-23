export default function TablePagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-end gap-2 mt-6">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-white disabled:opacity-40">←</button>
      <span className="text-gray-400">{page} / {totalPages || 1}</span>
      <button disabled={page === totalPages || totalPages === 0} onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-white disabled:opacity-40">→</button>
    </div>
  );
}