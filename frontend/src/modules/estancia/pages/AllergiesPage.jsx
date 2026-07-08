import { useState }    from "react";
import { useSelector } from "react-redux";
import { useGetStudentsQuery }          from "../../../features/students/studentsApi";
import { useGetMyChildrenQuery }        from "../../../features/me/meApi";
import { useGetAllergiesByStudentQuery, useCreateAllergyMutation, useDeleteAllergyMutation }
  from "../api/allergiesApi";
import StudentSearchSelect from "../../../components/forms/StudentSearchSelect";
import { useToast }        from "../../../features/toast/useToast";

const TYPE_CONFIG = {
  ALERGIA:       { label: "⚠️ Alergia",        color: "text-red-400 bg-red-500/10 border-red-500/30" },
  INTOLERANCIA:  { label: "🥛 Intolerancia",    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" },
  DIETA_ESPECIAL:{ label: "🍽️ Dieta especial",  color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
  NOTA_MEDICA:   { label: "📋 Nota médica",      color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
};

const SEVERITY_CONFIG = {
  LEVE:   { label: "Leve",      color: "bg-green-500/20 text-green-400" },
  MEDIA:  { label: "Media",     color: "bg-yellow-500/20 text-yellow-400" },
  SEVERA: { label: "Severa",    color: "bg-orange-500/20 text-orange-400" },
  MORTAL: { label: "⚠️ MORTAL", color: "bg-red-500/20 text-red-400 font-black" },
};

export default function AllergiesPage() {
  const { user }  = useSelector((s) => s.auth);
  const toast     = useToast();
  const isTeacher = user?.role === "teacher";
  const isAdmin   = user?.role === "admin";
  const isParent  = user?.role === "parent";

  const [selectedStudent, setSelectedStudent] = useState("");
  const [showForm, setShowForm]               = useState(false);
  const [form, setForm] = useState({
    studentId: "", allergy_type: "ALERGIA", description: "", severity: "MEDIA",
  });

  // 🔥 Admin/Teacher usan todos los estudiantes, parent usa solo sus hijos
  const { data: allStudentsData = [] } = useGetStudentsQuery(undefined, { skip: isParent });
  const { data: myChildrenData }       = useGetMyChildrenQuery(undefined, { skip: !isParent });

  const students = isParent
    ? (myChildrenData?.data || [])
    : (allStudentsData || []);

  const { data: allergiesData }          = useGetAllergiesByStudentQuery(selectedStudent, { skip: !selectedStudent });
  const [createAllergy, { isLoading: creating }] = useCreateAllergyMutation();
  const [deleteAllergy]                          = useDeleteAllergyMutation();

  const allergies = allergiesData?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId || !form.description) { toast.error("Error", "Completa los campos requeridos"); return; }
    try {
      await createAllergy(form).unwrap();
      toast.success("Alergia registrada", "Información guardada correctamente");
      setForm({ studentId: form.studentId, allergy_type: "ALERGIA", description: "", severity: "MEDIA" });
      setShowForm(false);
      setSelectedStudent(form.studentId);
    } catch (err) {
      toast.error("Error", err?.data?.message || "Error al guardar");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este registro?")) return;
    try {
      await deleteAllergy(id).unwrap();
      toast.success("Eliminado", "Registro removido");
    } catch { toast.error("Error", "No se pudo eliminar"); }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">⚠️ Alergias y Restricciones</h1>
          <p className="text-gray-400 mt-1">Control alimenticio y médico por alumno</p>
        </div>
        {(isTeacher || isAdmin) && (
          <button onClick={() => setShowForm(!showForm)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold">
            {showForm ? "Cancelar" : "+ Agregar Restricción"}
          </button>
        )}
      </div>

      {/* SELECTOR */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
        <label className="text-sm text-gray-400 mb-2 block">
          {isParent ? "Ver restricciones de tu hijo:" : "Ver restricciones de:"}
        </label>
        <StudentSearchSelect students={students} value={selectedStudent}
          onChange={setSelectedStudent} placeholder="Buscar alumno..." />
      </div>

      {showForm && (isTeacher || isAdmin) && (
        <div className="bg-gray-900 border border-red-500/20 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">⚠️ Nueva Restricción</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Alumno *</label>
              <StudentSearchSelect students={students} value={form.studentId}
                onChange={(id) => setForm((p) => ({ ...p, studentId: id }))}
                placeholder="Buscar alumno..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Tipo *</label>
                <select value={form.allergy_type} onChange={(e) => setForm((p) => ({ ...p, allergy_type: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white">
                  {Object.entries(TYPE_CONFIG).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Severidad</label>
                <select value={form.severity} onChange={(e) => setForm((p) => ({ ...p, severity: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white">
                  {Object.entries(SEVERITY_CONFIG).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Descripción *</label>
              <input type="text" value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Ej: Cacahuate — riesgo de anafilaxia"
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-red-500" />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-2xl bg-gray-800 text-white">Cancelar</button>
              <button type="submit" disabled={creating}
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold">
                {creating ? "Guardando..." : "⚠️ Guardar Restricción"}
              </button>
            </div>
          </form>
        </div>
      )}

      {selectedStudent && (
        <div className="space-y-3">
          {allergies.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center text-gray-400">
              <p className="text-5xl mb-4">✅</p>
              <p className="text-xl font-bold text-white">Sin restricciones registradas</p>
            </div>
          ) : allergies.map((a) => (
            <div key={a.id} className={`rounded-3xl border p-6 flex items-center justify-between ${TYPE_CONFIG[a.allergy_type]?.color}`}>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold">{TYPE_CONFIG[a.allergy_type]?.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${SEVERITY_CONFIG[a.severity]?.color}`}>
                    {SEVERITY_CONFIG[a.severity]?.label}
                  </span>
                </div>
                <p className="text-white font-bold">{a.description}</p>
              </div>
              {isAdmin && (
                <button onClick={() => handleDelete(a.id)}
                  className="px-3 py-1 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/40 text-xs font-bold border border-red-500/30">
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}