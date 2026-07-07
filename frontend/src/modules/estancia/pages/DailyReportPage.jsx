import { useState }    from "react";
import { useSelector } from "react-redux";
import { useGetStudentsQuery } from "../../../features/students/studentsApi";
import { useGetDailyByDateQuery, useCreateDailyReportMutation } from "../api/dailyReportsApi";
import StudentSearchSelect from "../../../components/forms/StudentSearchSelect";
import { useToast }        from "../../../features/toast/useToast";
import SkeletonTable       from "../../../components/feedback/SkeletonTable";

const TODAY = new Date().toISOString().split("T")[0];

const OPTIONS = {
  feeding:    ["COMIO_TODO", "COMIO_POCO", "NO_QUISO_COMER"],
  nap:        ["DURMIO_BIEN", "AGITADO", "NO_DURMIO"],
  mood:       ["TRANQUILO", "ACTIVO", "IRRITABLE", "LLORON"],
  evacuation: ["NORMAL", "DIARREA", "NO_EVACUO"],
};

const LABELS = {
  feeding:        { COMIO_TODO: "🍽️ Comió todo", COMIO_POCO: "🍽️ Comió poco", NO_QUISO_COMER: "🍽️ No quiso comer" },
  nap:            { DURMIO_BIEN: "😴 Durmió bien", AGITADO: "😤 Agitado", NO_DURMIO: "👁️ No durmió" },
  mood:           { TRANQUILO: "😊 Tranquilo", ACTIVO: "⚡ Activo", IRRITABLE: "😠 Irritable", LLORON: "😢 Llorón" },
  evacuation:     { NORMAL: "✅ Normal", DIARREA: "⚠️ Diarrea", NO_EVACUO: "❌ No evacuó" },
};

export default function DailyReportPage() {
  const { user }  = useSelector((s) => s.auth);
  const toast     = useToast();
  const isTeacher = user?.role === "teacher";
  const isAdmin   = user?.role === "admin";

  const [date, setDate]         = useState(TODAY);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({
    studentId: "", feeding: "", nap: "", mood: "",
    evacuation: "", activities: "", notes: "",
  });

  const { data: reportsData, isLoading } = useGetDailyByDateQuery(date);
  const { data: studentsData = [] }      = useGetStudentsQuery(undefined, { skip: !isTeacher && !isAdmin });
  const [createReport, { isLoading: creating }] = useCreateDailyReportMutation();

  const reports  = reportsData?.data  || [];
  const students = studentsData || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId) { toast.error("Error", "Selecciona un alumno"); return; }
    try {
      await createReport({ ...form, report_date: date }).unwrap();
      toast.success("Reporte creado", "El padre fue notificado automáticamente");
      setForm({ studentId: "", feeding: "", nap: "", mood: "", evacuation: "", activities: "", notes: "" });
      setShowForm(false);
    } catch (err) {
      toast.error("Error", err?.data?.message || "Error al crear reporte");
    }
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">📋 Reporte Diario</h1>
          <p className="text-gray-400 mt-1">Bitácora digital del niño</p>
        </div>
        <div className="flex items-center gap-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white [color-scheme:dark]" />
          {(isTeacher || isAdmin) && (
            <button onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold">
              {showForm ? "Cancelar" : "+ Nuevo Reporte"}
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">📝 Crear Reporte del Día</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Alumno *</label>
              <StudentSearchSelect students={students} value={form.studentId}
                onChange={(id) => setForm((p) => ({ ...p, studentId: id }))}
                placeholder="Buscar alumno..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(OPTIONS).map(([key, opts]) => (
                <div key={key}>
                  <label className="text-sm text-gray-400 mb-1 block capitalize">
                    {key === "feeding" ? "🍽️ Alimentación" : key === "nap" ? "😴 Siesta" : key === "mood" ? "😊 Humor" : "🚽 Evacuaciones"}
                  </label>
                  <select value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white">
                    <option value="">Seleccionar...</option>
                    {opts.map((o) => (
                      <option key={o} value={o}>{LABELS[key][o]}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">🎨 Actividades del día</label>
              <textarea value={form.activities} onChange={(e) => setForm((p) => ({ ...p, activities: e.target.value }))}
                rows={3} placeholder="¿Qué hicimos hoy?..."
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">📝 Observaciones generales</label>
              <textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                rows={2} placeholder="Notas adicionales..."
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-2xl bg-gray-800 text-white">Cancelar</button>
              <button type="submit" disabled={creating}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
                {creating ? "Guardando..." : "📋 Publicar Reporte"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {reports.length === 0 ? (
          <div className="col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center text-gray-400">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-xl font-bold text-white">No hay reportes para esta fecha</p>
            <p className="mt-2">Crea el primer reporte del día</p>
          </div>
        ) : reports.map((r) => (
          <div key={r.id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {r.first_name?.[0]}{r.last_name?.[0]}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{r.first_name} {r.last_name}</h3>
                  <p className="text-gray-500 text-xs">{new Date(r.report_date).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}</p>
                </div>
              </div>
              {r.parent_notified && <span className="text-green-400 text-xs font-bold">✅ Padre notificado</span>}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {r.feeding    && <div className="bg-gray-800 rounded-2xl p-3"><p className="text-gray-500 text-xs">Alimentación</p><p className="text-white text-sm font-bold mt-1">{LABELS.feeding[r.feeding]}</p></div>}
              {r.nap        && <div className="bg-gray-800 rounded-2xl p-3"><p className="text-gray-500 text-xs">Siesta</p><p className="text-white text-sm font-bold mt-1">{LABELS.nap[r.nap]}</p></div>}
              {r.mood       && <div className="bg-gray-800 rounded-2xl p-3"><p className="text-gray-500 text-xs">Humor</p><p className="text-white text-sm font-bold mt-1">{LABELS.mood[r.mood]}</p></div>}
              {r.evacuation && <div className="bg-gray-800 rounded-2xl p-3"><p className="text-gray-500 text-xs">Evacuaciones</p><p className="text-white text-sm font-bold mt-1">{LABELS.evacuation[r.evacuation]}</p></div>}
            </div>

            {r.activities && (
              <div className="bg-gray-800 rounded-2xl p-3 mb-3">
                <p className="text-gray-500 text-xs mb-1">🎨 Actividades</p>
                <p className="text-white text-sm">{r.activities}</p>
              </div>
            )}
            {r.notes && (
              <div className="bg-gray-800 rounded-2xl p-3">
                <p className="text-gray-500 text-xs mb-1">📝 Observaciones</p>
                <p className="text-white text-sm">{r.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}