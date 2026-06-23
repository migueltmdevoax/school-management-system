import { useState }    from "react";
import { useSelector } from "react-redux";
import {
  useGetAllIncidentsQuery,
  useCreateIncidentMutation,
  useDeleteIncidentMutation,
} from "../../../features/incidents/incidentsApi";
import { useGetStudentsQuery } from "../../../features/students/studentsApi";
import { useToast }            from "../../../features/toast/useToast";
import SkeletonTable           from "../../../components/feedback/SkeletonTable";
import StudentSearchSelect     from "../../../components/forms/StudentSearchSelect";

export default function IncidentsPage() {
  const { user } = useSelector((s) => s.auth);
  const toast    = useToast();
  const isAdmin  = user?.role === "admin";
  const isTeacher = user?.role === "teacher";

  const { data, isLoading, refetch }            = useGetAllIncidentsQuery();
  const { data: studentsData = [] }             = useGetStudentsQuery(undefined, { skip: !isAdmin && !isTeacher });
  const [createIncident, { isLoading: creating }] = useCreateIncidentMutation();
  const [deleteIncident]                          = useDeleteIncidentMutation();

  const incidents = data?.data || [];
  const students   = studentsData || [];

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ studentId: "", title: "", description: "", severity: "LOW" });
  const [error, setError] = useState("");

  const severityStyles = {
    LOW:    "bg-green-500/20 text-green-400",
    MEDIUM: "bg-yellow-500/20 text-yellow-400",
    HIGH:   "bg-red-500/20 text-red-400",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.studentId || !form.title) {
      setError("Student and title are required");
      return;
    }
    try {
      await createIncident({
        studentId:   form.studentId,
        teacherId:   user?.teacher_id || null,
        title:       form.title,
        description: form.description,
        severity:    form.severity,
      }).unwrap();
      toast.success("Incident created", "Incident registered successfully");
      setForm({ studentId: "", title: "", description: "", severity: "LOW" });
      setShowForm(false);
      refetch();
    } catch (err) {
      setError(err?.data?.message || "Error creating incident");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteIncident(id).unwrap();
      toast.success("Deleted", "Incident removed");
    } catch {
      toast.error("Error", "Could not delete incident");
    }
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">🚨 Incidents</h1>
          <p className="text-gray-400 mt-1">{incidents.length} total incidents</p>
        </div>
        {(isAdmin || isTeacher) && (
          <button onClick={() => setShowForm(!showForm)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold">
            {showForm ? "Cancel" : "+ New Incident"}
          </button>
        )}
      </div>

      {showForm && (isAdmin || isTeacher) && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Register Incident</h2>
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-2xl text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="text-sm text-gray-400 mb-1 block">Title *</label>
              <input type="text" value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-red-500"
                placeholder="Incident title" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Description</label>
              <textarea value={form.description} rows={3}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-red-500"
                placeholder="Describe the incident..." />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Severity</label>
              <select value={form.severity}
                onChange={(e) => setForm((p) => ({ ...p, severity: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white">
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-2xl bg-gray-800 text-white">Cancel</button>
              <button type="submit" disabled={creating}
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold">
                {creating ? "Saving..." : "🚨 Register Incident"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-gray-800">
        <table className="w-full bg-gray-950">
          <thead className="bg-gray-900">
            <tr>
              {["Student","Title","Description","Severity","Date","Actions"].map((h) => (
                <th key={h} className="p-4 text-left text-gray-400 text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-500">No incidents found</td>
              </tr>
            ) : (
              incidents.map((i) => (
                <tr key={i.id} className="border-t border-gray-800 hover:bg-gray-900">
                  <td className="p-4 text-white">{i.first_name} {i.last_name}</td>
                  <td className="p-4 text-white">{i.title}</td>
                  <td className="p-4 text-gray-400">{i.description || "—"}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${severityStyles[i.severity]}`}>
                      {i.severity}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(i.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {isAdmin && (
                      <button onClick={() => handleDelete(i.id)}
                        className="px-3 py-1 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/40 text-xs font-bold">
                        Delete
                      </button>
                    )}
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