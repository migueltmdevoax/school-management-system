import { useState } from "react";
import {
  useGetMyAssignmentsQuery,
} from "../../../features/me/meApi";

import {
  useDeleteAssignmentMutation,
} from "../../../features/assignments/api/assignmentsApi";

import CreateAssignmentModal from "../components/CreateAssignmentModal";

export default function AssignmentsPage() {
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading } = useGetMyAssignmentsQuery();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const assignments = data?.data || [];

  if (isLoading) {
    return <div className="p-10 text-white">Loading assignments...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">📚 Assignments</h1>
          <p className="text-gray-400 mt-1">Classroom workflow engine</p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold"
        >
          + New Assignment
        </button>
      </div>

      {/* 🔥 GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-gray-900 border border-gray-800 rounded-3xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{assignment.title}</h2>
                <p className="text-gray-400 mt-2">{assignment.description}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold">
                {assignment.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-800 rounded-2xl p-4">
                <p className="text-gray-500 text-sm">Students</p>
                <h3 className="text-white text-2xl font-bold">{assignment.assigned_students}</h3>
              </div>
              <div className="bg-gray-800 rounded-2xl p-4">
                <p className="text-gray-500 text-sm">Submissions</p>
                <h3 className="text-white text-2xl font-bold">{assignment.submissions_count}</h3>
              </div>
              <div className="bg-gray-800 rounded-2xl p-4">
                <p className="text-gray-500 text-sm">Max Score</p>
                <h3 className="text-white text-2xl font-bold">{assignment.max_score}</h3>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-gray-500 text-sm">Due Date</p>
                <p className="text-white font-semibold">
                  {assignment.due_date || "No deadline"}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-xl bg-gray-800 text-white">Edit</button>
                <button
                  onClick={() => deleteAssignment(assignment.id)}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      <CreateAssignmentModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}