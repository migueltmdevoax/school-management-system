// 🔥 StudentActions.jsx

export default function StudentActions({
  student,
  onEdit,
  onDelete,
  onView,
  onAssignment,
  onIncident,
}) {

  return (

    <div className="
      grid
      grid-cols-2
      gap-3
      mt-6
    ">

      <button
        onClick={() =>
          onAssignment?.(student)
        }
        className="
          bg-purple-600
          hover:bg-purple-700
          text-white
          py-3
          rounded-2xl
          font-bold
          transition-all
        "
      >
        📚 Assignment
      </button>

      <button
        onClick={() =>
          onIncident?.(student)
        }
        className="
          bg-yellow-600
          hover:bg-yellow-700
          text-white
          py-3
          rounded-2xl
          font-bold
          transition-all
        "
      >
        🚨 Incident
      </button>

      <button
        onClick={() =>
          onView?.(student)
        }
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-2xl
          font-bold
          transition-all
        "
      >
        👁 View
      </button>

      <button
        onClick={() =>
          onEdit?.(student)
        }
        className="
          bg-gray-800
          hover:bg-gray-700
          text-white
          py-3
          rounded-2xl
          font-bold
          transition-all
        "
      >
        ✏️ Edit
      </button>

      <button
        onClick={() =>
          onDelete?.(student)
        }
        className="
          col-span-2
          bg-red-600
          hover:bg-red-700
          text-white
          py-3
          rounded-2xl
          font-bold
          transition-all
        "
      >
        🗑 Delete Student
      </button>

    </div>

  );
}