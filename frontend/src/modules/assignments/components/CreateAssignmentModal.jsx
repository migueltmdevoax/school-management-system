import { useEffect, useState } from "react";
import { useCreateAssignmentMutation } from "../../../features/assignments/api/assignmentsApi";
import { useGetGroupsQuery } from "../../../features/groups/groupsApi";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useToast } from "../../../features/toast/useToast";

export default function CreateAssignmentModal({ open, onClose }) {
  const { user } = useAppSelector((state) => state.auth);
  const toast = useToast();
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();
  const { data: groupsResponse, isLoading: groupsLoading } = useGetGroupsQuery();
  const groups = groupsResponse?.data || [];

  const [error, setError] = useState("");

  const initialForm = {
    title: "",
    description: "",
    due_date: "",
    max_score: 100, // 🔥 ahora es porcentaje, default 100%
    group_id: "",
    teacher_id: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (user?.teacher_id) {
      setFormData((prev) => ({ ...prev, teacher_id: user.teacher_id }));
    }
  }, [user]);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ ...initialForm, teacher_id: user?.teacher_id || "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");

      if (!formData.title.trim()) {
        setError("Assignment title required");
        return;
      }
      if (!formData.group_id) {
        setError("Select a group");
        return;
      }

      const payload = {
        ...formData,
        title:       formData.title.trim(),
        description: formData.description.trim(),
        max_score:   Number(formData.max_score), // porcentaje 0-100
        published:   true, // 🔥 siempre se publica al crear, ya no es opción confusa
      };

      const result = await createAssignment(payload).unwrap();

      // 🔥 Toast de confirmación — esto es lo que faltaba
      toast.success("Assignment created", `"${result.data?.title || formData.title}" was published successfully`);

      resetForm();
      onClose();
    } catch (err) {
      console.error("❌ CREATE ASSIGNMENT ERROR:", err);
      const msg = err?.data?.message || err?.message || "Error creating assignment";
      setError(msg);
      toast.error("Error", msg);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-gray-950 border border-gray-800 rounded-3xl p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white">📚 Crear tarea</h2>
            <p className="text-gray-400 mt-1">Flujo de trabajo del salon</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl transition-all">✕</button>
        </div>

        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Titulo *</label>
            <input
              type="text" name="title" placeholder="Examen de Matematicas"
              value={formData.title} onChange={handleChange} required disabled={isLoading}
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Descripcion</label>
            <textarea
              name="description" rows="4" placeholder="Write assignment instructions..."
              value={formData.description} onChange={handleChange} disabled={isLoading}
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500 disabled:opacity-50"
            />
          </div>

          {/* GROUP */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Grupo *</label>
            <select
              name="group_id" value={formData.group_id} onChange={handleChange}
              required disabled={isLoading || groupsLoading}
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white"
            >
              <option value="">Select group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>

          {/* GRID: DUE DATE (calendario nativo) + WEIGHT % */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Fecha limite</label>
              {/* 🔥 input type="date" ya trae el ícono de calendario nativo del navegador */}
              <input
                type="date" name="due_date" value={formData.due_date}
                onChange={handleChange} disabled={isLoading}
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 text-white [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Peso (%)</label>
              <div className="relative">
                <input
                  type="number" name="max_score" min="1" max="100" step="0.5"
                  value={formData.max_score} onChange={handleChange} disabled={isLoading}
                  className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 pr-10 text-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} disabled={isLoading}
              className="px-5 py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-white transition-all">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading || groupsLoading}
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all">
              {isLoading ? "Creando..." : "🚀 Publicar Tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}