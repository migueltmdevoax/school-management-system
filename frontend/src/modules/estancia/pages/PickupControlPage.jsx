import { useState }    from "react";
import { useSelector } from "react-redux";
import { useGetStudentsQuery }  from "../../../features/students/studentsApi";
import { useGetPickupByDateQuery, useCreatePickupMutation } from "../api/pickupControlApi";
import StudentSearchSelect from "../../../components/forms/StudentSearchSelect";
import { useToast }        from "../../../features/toast/useToast";
import SkeletonTable       from "../../../components/feedback/SkeletonTable";

const TODAY = new Date().toISOString().split("T")[0];

export default function PickupControlPage() {
  const { user }  = useSelector((s) => s.auth);
  const toast     = useToast();
  const isTeacher = user?.role === "teacher";
  const isAdmin   = user?.role === "admin";

  const [date, setDate]         = useState(TODAY);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({
    studentId: "", event_type: "LLEGADA",
    delivered_by: "", picked_up_by: "", relationship: "", notes: "",
  });

  const { data: pickupData, isLoading } = useGetPickupByDateQuery(date);
  const { data: studentsData = [] }     = useGetStudentsQuery(undefined, { skip: !isTeacher && !isAdmin });
  const [createPickup, { isLoading: creating }] = useCreatePickupMutation();

  const entries  = pickupData?.data  || [];
  const students = studentsData || [];

  const llegadas = entries.filter((e) => e.event_type === "LLEGADA");
  const salidas  = entries.filter((e) => e.event_type === "SALIDA");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId) { toast.error("Error", "Selecciona un alumno"); return; }
    try {
      await createPickup(form).unwrap();
      toast.success(
        form.event_type === "LLEGADA" ? "🏫 Llegada registrada" : "🏠 Salida registrada",
        "El padre fue notificado en tiempo real"
      );
      setForm({ studentId: "", event_type: "LLEGADA", delivered_by: "", picked_up_by: "", relationship: "", notes: "" });
      setShowForm(false);
    } catch (err) {
      toast.error("Error", err?.data?.message || "Error al registrar");
    }
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">🚪 Control de Entrada/Salida</h1>
          <p className="text-gray-400 mt-1">Registro de quién entrega y recoge</p>
        </div>
        <div className="flex items-center gap-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white [color-scheme:dark]" />
          {(isTeacher || isAdmin) && (
            <button onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold">
              {showForm ? "Cancelar" : "+ Registrar"}
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">🚪 Nuevo Registro</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Tipo *</label>
                <select value={form.event_type} onChange={(e) => setForm((p) => ({ ...p, event_type: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white">
                  <option value="LLEGADA">🏫 Llegada</option>
                  <option value="SALIDA">🏠 Salida</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Alumno *</label>
                <StudentSearchSelect students={students} value={form.studentId}
                  onChange={(id) => setForm((p) => ({ ...p, studentId: id }))}
                  placeholder="Buscar alumno..." />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  {form.event_type === "LLEGADA" ? "Entregado por" : "Recogido por"}
                </label>
                <input type="text"
                  value={form.event_type === "LLEGADA" ? form.delivered_by : form.picked_up_by}
                  onChange={(e) => setForm((p) => ({
                    ...p,
                    [form.event_type === "LLEGADA" ? "delivered_by" : "picked_up_by"]: e.target.value
                  }))}
                  placeholder="Nombre completo"
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Parentesco</label>
                <select value={form.relationship} onChange={(e) => setForm((p) => ({ ...p, relationship: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white">
                  <option value="">Seleccionar...</option>
                  {["Mamá", "Papá", "Abuelo/a", "Tío/a", "Tutor autorizado", "Otro"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Notas</label>
              <input type="text" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                placeholder="Observaciones opcionales..."
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-2xl bg-gray-800 text-white">Cancelar</button>
              <button type="submit" disabled={creating}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
                {creating ? "Registrando..." : "✅ Registrar"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LLEGADAS */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">🏫 Llegadas ({llegadas.length})</h2>
          <div className="space-y-3">
            {llegadas.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">Sin llegadas registradas</p>
            ) : llegadas.map((e) => (
              <div key={e.id} className="bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold">{e.first_name} {e.last_name}</p>
                  <p className="text-green-400 text-xs font-bold">
                    {new Date(e.event_time).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {e.delivered_by && <p className="text-gray-400 text-sm mt-1">Entregado por: {e.delivered_by} {e.relationship ? `(${e.relationship})` : ""}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* SALIDAS */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">🏠 Salidas ({salidas.length})</h2>
          <div className="space-y-3">
            {salidas.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">Sin salidas registradas</p>
            ) : salidas.map((e) => (
              <div key={e.id} className="bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold">{e.first_name} {e.last_name}</p>
                  <p className="text-blue-400 text-xs font-bold">
                    {new Date(e.event_time).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {e.picked_up_by && <p className="text-gray-400 text-sm mt-1">Recogido por: {e.picked_up_by} {e.relationship ? `(${e.relationship})` : ""}</p>}
                {e.notes && <p className="text-gray-500 text-xs mt-1">{e.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}