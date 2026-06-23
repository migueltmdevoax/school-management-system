import { useState }        from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal }      from "../modalSlice";
import { useCreateIncidentMutation } from "../../incidents/incidentsApi";
import { useGetStudentsQuery }       from "../../students/studentsApi";
import { useToast }                  from "../../toast/useToast";

export default function CreateIncidentModal() {
  const dispatch  = useDispatch();
  const toast     = useToast();
  const { user }  = useSelector((s) => s.auth);
  const [createIncident, { isLoading }] = useCreateIncidentMutation();
  const { data: studentsData = [] }     = useGetStudentsQuery();
  const students = studentsData || [];

  const [form, setForm]   = useState({ studentId: "", title: "", description: "", severity: "LOW" });
  const [error, setError] = useState("");

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
      dispatch(closeModal());
    } catch (err) {
      setError(err?.data?.message || "Error creating incident");
    }
  };

  return (
    <div className="w-full max-w-lg bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">🚨 Register Incident</h2>
        <button onClick={() => dispatch(closeModal())} className="text-gray-400 hover:text-white text-2xl">✕</button>
      </div>
      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-2xl text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Student *</label>
          <select value={form.studentId}
            onChange={(e) => setForm((p) => ({ ...p, studentId: e.target.value }))}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white">
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Title *</label>
          <input type="text" value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white outline-none focus:border-red-500"
            placeholder="Incident title" />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Description</label>
          <textarea value={form.description} rows={3}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white outline-none focus:border-red-500"
            placeholder="Describe the incident..." />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Severity</label>
          <select value={form.severity}
            onChange={(e) => setForm((p) => ({ ...p, severity: e.target.value }))}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white">
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => dispatch(closeModal())}
            className="px-5 py-3 rounded-2xl bg-gray-800 text-white hover:bg-gray-700">Cancel</button>
          <button type="submit" disabled={isLoading}
            className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold">
            {isLoading ? "Saving..." : "🚨 Register Incident"}
          </button>
        </div>
      </form>
    </div>
  );
}