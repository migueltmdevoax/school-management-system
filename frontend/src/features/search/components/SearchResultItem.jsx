export default function SearchResultItem({ student, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-gray-800 bg-gray-900/60 p-4 text-left transition-all hover:border-indigo-500"
    >
      <div>
        <h4 className="font-semibold text-white">
          {student.first_name} {student.last_name}
        </h4>
        <p className="mt-1 text-sm text-gray-400">{student.email}</p>
      </div>
      <span className="text-gray-500">↵</span>
    </button>
  );
}