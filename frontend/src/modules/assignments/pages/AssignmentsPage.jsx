import { useState }          from "react";
import { useSelector }       from "react-redux";
import {
  useGetMyAssignmentsQuery,
  useDeleteAssignmentMutation,
} from "../../../features/assignments/api/assignmentsApi";
import CreateAssignmentModal from "../components/CreateAssignmentModal";
import SkeletonTable         from "../../../components/feedback/SkeletonTable";

export default function AssignmentsPage() {
  const { user } = useSelector((s) => s.auth);
  const isParent  = user?.role === "parent";
  const isTeacher = user?.role === "teacher";
  const isAdmin   = user?.role === "admin";

  const [openModal, setOpenModal] = useState(false);

  const { data: assignmentsResponse, isLoading } = useGetMyAssignmentsQuery();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const assignments = assignmentsResponse?.data || [];

  const severityStyles = {
    ACTIVE:   "bg-blue-500/20 text-blue-400",
    INACTIVE: "bg-gray-500/20 text-gray-400",
    GRADED:   "bg-green-500/20 text-green-400",
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">📚 Assignments</h1>
          <p className="text-gray-400 mt-1">{assignments.length} total assignments</p>
          <p className="text-gray-400 mt-1">
            {isParent ? "Your children's assignments" : "Classroom workflow engine"}
          </p>
        </div>
        {(isAdmin || isTeacher) && (
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold"
          >
            + New Assignment
          </button>
        )}
      </div>

      {assignments.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center text-gray-400">
          <p className="text-5xl mb-4">📚</p>
          <p className="text-xl font-bold text-white">No assignments yet</p>
          {isParent && <p className="mt-2 text-gray-400">Assignments from teachers will appear here</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {assignments.map((assignment, index) => (
            // 🔥 Fix: combina assignment.id + student_id para evitar keys duplicadas
            // cuando varios hijos de un parent comparten el mismo assignment
            <div key={`${assignment.id}-${assignment.student_id || index}`}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{assignment.title}</h2>
                  <p className="text-gray-400 mt-2">{assignment.description}</p>
                  {isParent && (assignment.first_name || assignment.last_name) && (
                    <p className="text-indigo-400 text-sm mt-2">
                      👨‍🎓 {assignment.first_name} {assignment.last_name}
                    </p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ml-3 ${severityStyles[assignment.status] || severityStyles.ACTIVE}`}>
                  {assignment.status || "ACTIVE"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
  <div className="bg-gray-800 rounded-2xl p-4">
    <p className="text-gray-500 text-sm">Weight</p>
    <h3 className="text-white text-2xl font-bold">{assignment.max_score || 100}%</h3>
  </div>
  <div className="bg-gray-800 rounded-2xl p-4">
    <p className="text-gray-500 text-sm">Due Date</p>
    <h3 className="text-white text-sm font-bold mt-1">
      {/* 🔥 Fix: formatea la fecha bonita sin la hora basura */}
      {assignment.due_date
        ? new Date(assignment.due_date).toLocaleDateString("es-MX", {
            day: "numeric", month: "short", year: "numeric"
          })
        : "No deadline"}
    </h3>
  </div>
  <div className="bg-gray-800 rounded-2xl p-4">
    <p className="text-gray-500 text-sm">Group</p>
    <h3 className="text-white text-sm font-bold mt-1">
      {/* 🔥 Fix: fallback más claro si no llega el nombre */}
      {assignment.group_name || "Unassigned"}
    </h3>
  </div>
</div>

              {(isAdmin || isTeacher) && (
                <div className="flex gap-3 mt-6">
                  <button className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 text-sm">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                    className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <CreateAssignmentModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}