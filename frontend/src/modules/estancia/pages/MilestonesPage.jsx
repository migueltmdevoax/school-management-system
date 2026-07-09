import { useState }    from "react";
import { useSelector } from "react-redux";
import { useGetStudentsQuery }       from "../../../features/students/studentsApi";
import { useGetMyChildrenQuery }     from "../../../features/me/meApi";
import { useGetMilestonesQuery, useCreateMilestoneMutation } from "../api/milestonesApi";
import StudentSearchSelect from "../../../components/forms/StudentSearchSelect";
import { useToast }        from "../../../features/toast/useToast";

const AREAS = [
  { key: "motor_gruesa",   label: "🏃 Motricidad Gruesa" },
  { key: "motor_fina",     label: "✋ Motricidad Fina" },
  { key: "lenguaje",       label: "💬 Lenguaje y Comunicación" },
  { key: "socioemocional", label: "❤️ Desarrollo Socioemocional" },
  { key: "autonomia",      label: "🌟 Autonomía e Independencia" },
  { key: "cognicion",      label: "🧠 Cognición y Exploración" },
];

const LEVELS = [
  { value: "EN_PROCESO",  label: "En Proceso",  color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" },
  { value: "LOGRADO",     label: "Logrado",      color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
  { value: "CONSOLIDADO", label: "Consolidado",  color: "text-green-400 bg-green-500/10 border-green-500/30" },
];

export default function MilestonesPage() {
  const { user }  = useSelector((s) => s.auth);
  const toast     = useToast();
  const isTeacher = user?.role === "teacher";
  const isAdmin   = user?.role === "admin";
  const isParent  = user?.role === "parent";

  const [selectedStudent, setSelectedStudent] = useState("");
  const [showForm, setShowForm]               = useState(false);
  const [form, setForm] = useState({
    studentId: "", period: "",
    motor_gruesa: "", motor_fina: "", lenguaje: "",
    socioemocional: "", autonomia: "", cognicion: "", observations: "",
  });

  // 🔥 Parent usa sus hijos, teacher/admin usan todos
  const { data: allStudentsData = [] } = useGetStudentsQuery(undefined, { skip: isParent });
  const { data: myChildrenData }       = useGetMyChildrenQuery(undefined, { skip: !isParent });

  const students = isParent
    ? (myChildrenData?.data || [])
    : (allStudentsData || []);

  const { data: milestonesData }     = useGetMilestonesQuery(selectedStudent, { skip: !selectedStudent });
  const [createMilestone, { isLoading: creating }] = useCreateMilestoneMutation();

  const milestones = milestonesData?.data || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId || !form.period) { toast.error("Error", "Selecciona alumno y período"); return; }
    try {
      await createMilestone(form).unwrap();
      toast.success("Evaluación guardada", "Hitos de desarrollo actualizados");
      setShowForm(false);
      setSelectedStudent(form.studentId);
    } catch (err) {
      toast.error("Error", err?.data?.message || "Error al guardar");
    }
  };

  console.log("students para selector:", students);
  console.log("myChildrenData:", myChildrenData);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">🌱 Hitos de Desarrollo</h1>
          <p className="text-gray-400 mt-1">Evaluación cualitativa por áreas</p>
        </div>
        {(isTeacher || isAdmin) && (
          <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold">
            {showForm ? "Cancelar" : "+ Nueva Evaluación"}
          </button>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
        <label className="text-sm text-gray-400 mb-2 block">
          {isParent ? "Ver desarrollo de tu hijo:" : "Ver hitos de:"}
        </label>
        <StudentSearchSelect students={students} value={selectedStudent}
          onChange={setSelectedStudent} placeholder="Buscar alumno..." />
      </div>

      {showForm && (isTeacher || isAdmin) && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">📝 Nueva Evaluación</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Alumno *</label>
                <StudentSearchSelect students={students} value={form.studentId}
                  onChange={(id) => setForm((p) => ({ ...p, studentId: id }))}
                  placeholder="Buscar alumno..." />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Período *</label>
                <input type="text" value={form.period}
                  onChange={(e) => setForm((p) => ({ ...p, period: e.target.value }))}
                  placeholder="Ej: Bimestre 1 2025-2026"
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AREAS.map(({ key, label }) => (
                <div key={key}>
                  <label className="text-sm text-gray-400 mb-1 block">{label}</label>
                  <div className="flex gap-2">
                    {LEVELS.map(({ value, label: lvl, color }) => (
                      <button key={value} type="button"
                        onClick={() => setForm((p) => ({ ...p, [key]: value }))}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition ${
                          form[key] === value ? color : "bg-gray-800 text-gray-500 border-gray-700"
                        }`}>
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Observaciones generales</label>
              <textarea value={form.observations}
                onChange={(e) => setForm((p) => ({ ...p, observations: e.target.value }))}
                rows={3} placeholder="Notas del período..."
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-2xl bg-gray-800 text-white">Cancelar</button>
              <button type="submit" disabled={creating}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
                {creating ? "Guardando..." : "🌱 Guardar Evaluación"}
              </button>
            </div>
          </form>
        </div>
      )}

      {selectedStudent && (
        <div className="space-y-4">
          {milestones.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center text-gray-400">
              <p className="text-5xl mb-4">🌱</p>
              <p className="text-xl font-bold text-white">Sin evaluaciones aún</p>
            </div>
          ) : milestones.map((m) => (
            <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">📅 {m.period}</h3>
                <p className="text-gray-500 text-sm">{new Date(m.created_at).toLocaleDateString("es-MX")}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {AREAS.map(({ key, label }) => m[key] && (
                  <div key={key} className="bg-gray-800 rounded-2xl p-3">
                    <p className="text-gray-500 text-xs">{label}</p>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-bold border ${
                      LEVELS.find((l) => l.value === m[key])?.color || ""
                    }`}>
                      {LEVELS.find((l) => l.value === m[key])?.label}
                    </span>
                  </div>
                ))}
              </div>
              {m.observations && (
                <div className="mt-4 bg-gray-800 rounded-2xl p-3">
                  <p className="text-gray-500 text-xs">Observaciones</p>
                  <p className="text-white text-sm mt-1">{m.observations}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}