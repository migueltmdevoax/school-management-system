import { useState }          from "react";
import { useSelector }       from "react-redux";
import { useDispatch }       from "react-redux";
import {
  useGetGradesQuery,
} from "../../../features/grades/api/gradesApi";
import { apiSlice }               from "../../../app/api/apiSlice";
import { useGetStudentsQuery }    from "../../../features/students/studentsApi";
import { useGetAssignmentsQuery } from "../../../features/assignments/api/assignmentsApi";
import { useToast }               from "../../../features/toast/useToast";
import { hasPermission }          from "../../../utils/permissions";
import SkeletonTable              from "../../../components/feedback/SkeletonTable";
import StudentSearchSelect        from "../../../components/forms/StudentSearchSelect";

export default function GradesPage() {
  const dispatch  = useDispatch();
  const { user }  = useSelector((s) => s.auth);
  const toast     = useToast();
  const canCreate = hasPermission(user, "create:grades");

  const { data: gradesRes, isLoading } = useGetGradesQuery();
  const { data: studentsData }         = useGetStudentsQuery();
  const { data: assignmentsRes }       = useGetAssignmentsQuery(
    undefined,
    { skip: user?.role === "parent" }
  );

  const grades      = gradesRes?.data      || [];
  const students    = studentsData         || [];
  const assignments = assignmentsRes?.data || [];

  const [showForm, setShowForm] = useState(false);
  const [creating,  setCreating]  = useState(false);
  const [form, setForm] = useState({
    studentId: "", assignmentId: "", grade: "", feedback: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.studentId || !form.assignmentId || form.grade === "") {
      setError("Student, assignment and grade are required");
      return;
    }

    const gradeNum = Number(form.grade);
    if (gradeNum < 0 || gradeNum > 100) {
      setError("Grade must be between 0 and 100");
      return;
    }

    setCreating(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/grades/assignment-student`,
        {
          method:  "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:  `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            assignment_id: form.assignmentId,
            student_id:    form.studentId,
            grade:         gradeNum,
            feedback:      form.feedback,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error creating grade");
        return;
      }

      dispatch(apiSlice.util.invalidateTags(["Grades"]));

      toast.success("Grade created", "Grade saved successfully");
      setForm({ studentId: "", assignmentId: "", grade: "", feedback: "" });
      setShowForm(false);

    } catch (err) {
      setError(err.message || "Error creating grade");
    } finally {
      setCreating(false);
    }
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">📝 Grades</h1>
          <p className="text-gray-400 mt-1">Academic management</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold"
          >
            {showForm ? "Cancel" : "+ New Grade"}
          </button>
        )}
      </div>

      {showForm && canCreate && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Create Grade</h2>
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-2xl text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Student *</label>
                {/* 🔥 Reemplazado select plano por buscador */}
                <StudentSearchSelect
                  students={students}
                  value={form.studentId}
                  onChange={(id) => setForm((p) => ({ ...p, studentId: id }))}
                  placeholder="Search student by name..."
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Assignment *</label>
                <select
                  value={form.assignmentId}
                  onChange={(e) => setForm((p) => ({ ...p, assignmentId: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white"
                >
                  <option value="">Select assignment</option>
                  {assignments.map((a) => (
                    <option key={a.id} value={a.id}>{a.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Grade (0-100) *</label>
                <input
                  type="number" min="0" max="100"
                  value={form.grade}
                  onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500"
                  placeholder="85"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Feedback</label>
                <input
                  type="text"
                  value={form.feedback}
                  onChange={(e) => setForm((p) => ({ ...p, feedback: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500"
                  placeholder="Optional feedback..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { setShowForm(false); setError(""); }}
                className="px-5 py-3 rounded-2xl bg-gray-800 text-white hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold"
              >
                {creating ? "Saving..." : "💾 Save Grade"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-gray-800">
        <table className="w-full bg-gray-950">
          <thead className="bg-gray-900">
            <tr>
              {["Student","Assignment","Grade","Feedback","Date"].map((h) => (
                <th key={h} className="p-4 text-left text-gray-400 text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grades.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-500">No grades yet</td>
              </tr>
            ) : (
              grades.map((g) => (
                <tr key={g.id} className="border-t border-gray-800 hover:bg-gray-900">
                  <td className="p-4 text-white">{g.first_name} {g.last_name}</td>
                  <td className="p-4 text-gray-300">{g.assignment_title}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      g.grade >= 90 ? "bg-green-500/20 text-green-400" :
                      g.grade >= 70 ? "bg-yellow-500/20 text-yellow-400" :
                                      "bg-red-500/20 text-red-400"
                    }`}>
                      {g.grade}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{g.feedback || "—"}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(g.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}