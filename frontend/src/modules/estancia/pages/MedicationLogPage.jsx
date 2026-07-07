import { useState }    from "react";
import { useSelector } from "react-redux";
import { useGetStudentsQuery }          from "../../../features/students/studentsApi";
import { useGetMedicationPendingQuery, useCreateMedicationMutation,
         useAuthorizeMedicationMutation, useMarkAdministeredMutation }
  from "../api/medicationLogApi";
import StudentSearchSelect from "../../../components/forms/StudentSearchSelect";
import { useToast }        from "../../../features/toast/useToast";
import SkeletonTable       from "../../../components/feedback/SkeletonTable";

export default function MedicationLogPage() {
  const { user }  = useSelector((s) => s.auth);
  const toast     = useToast();
  const isTeacher = user?.role === "teacher";
  const isAdmin   = user?.role === "admin";
  const isParent  = user?.role === "parent";

  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({
    studentId: "", medication_name: "", dosage: "", reason: "",
  });

  const { data: pendingData, isLoading }   = useGetMedicationPendingQuery(undefined, { skip: isParent });
  const { data: studentsData = [] }        = useGetStudentsQuery(undefined, { skip: isParent });
  const [createMedication, { isLoading: creating }] = useCreateMedicationMutation();
  const [authorizeMedication]              = useAuthorizeMedicationMutation();
  const [markAdministered]                 = useMarkAdministeredMutation();

  const pending  = pendingData?.data  || [];
  const students = studentsData || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId || !form.medication_name || !form.dosage) {
      toast.error("Error", "Completa los campos requeridos"); return;
    }
    try {
      await createMedication(form).unwrap();
      toast.success("Solicitud enviada", "El padre recibió la solicitud de autorización");
      setForm({ studentId: "", medication_name: "", dosage: "", reason: "" });
      setShowForm(false);
    } catch (err) {
      toast.error("Error", err?.data?.message || "Error al registrar");
    }
  };

  const handleAuthorize = async (id) => {
    try {
      await authorizeMedication(id).unwrap();
      toast.success("✅ Autorizado", "La educadora fue notificada");
    } catch (err) {
      toast.error("Error", "No se pudo autorizar");
    }
  };

  const handleAdministered = async (id) => {
    try {
      await markAdministered(id).unwrap();
      toast.success("💊 Administrado", "Medicamento marcado como administrado");
    } catch (err) {
      toast.error("Error", "No se pudo marcar como administrado");
    }
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">💊 Medicamentos</h1>
          <p className="text-gray-400 mt-1">Registro con autorización digital del padre</p>
        </div>
        {(isTeacher || isAdmin) && (
          <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold">
            {showForm ? "Cancelar" : "+ Registrar Medicamento"}
          </button>
        )}
      </div>

      {showForm && (isTeacher || isAdmin) && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">💊 Nueva Solicitud</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Alumno *</label>
              <StudentSearchSelect students={students} value={form.studentId}
                onChange={(id) => setForm((p) => ({ ...p, studentId: id }))}
                placeholder="Buscar alumno..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Medicamento *</label>
                <input type="text" value={form.medication_name}
                  onChange={(e) => setForm((p) => ({ ...p, medication_name: e.target.value }))}
                  placeholder="Ej: Paracetamol 250mg"
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Dosis *</label>
                <input type="text" value={form.dosage}
                  onChange={(e) => setForm((p) => ({ ...p, dosage: e.target.value }))}
                  placeholder="Ej: 5ml"
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Motivo</label>
              <input type="text" value={form.reason}
                onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
                placeholder="Ej: Fiebre 38.2°C"
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-2xl bg-gray-800 text-white">Cancelar</button>
              <button type="submit" disabled={creating}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
                {creating ? "Enviando..." : "💊 Solicitar Autorización"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {pending.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center text-gray-400">
            <p className="text-5xl mb-4">💊</p>
            <p className="text-xl font-bold text-white">Sin medicamentos pendientes</p>
          </div>
        ) : pending.map((m) => (
          <div key={m.id} className={`bg-gray-900 border rounded-3xl p-6 ${
            !m.authorized ? "border-yellow-500/30" : !m.administered ? "border-blue-500/30" : "border-green-500/30"
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">
                  {m.first_name} {m.last_name}
                </h3>
                <p className="text-blue-400 font-bold mt-1">{m.medication_name} — {m.dosage}</p>
                {m.reason && <p className="text-gray-400 text-sm mt-1">Motivo: {m.reason}</p>}
                <p className="text-gray-500 text-xs mt-2">
                  Solicitado: {new Date(m.requested_at).toLocaleString("es-MX")}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {!m.authorized ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400">
                    ⏳ Esperando autorización
                  </span>
                ) : !m.administered ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                    ✅ Autorizado — pendiente administrar
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                    ✅ Administrado
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              {isParent && !m.authorized && (
                <button onClick={() => handleAuthorize(m.id)}
                  className="px-4 py-2 rounded-xl bg-green-600/20 text-green-400 hover:bg-green-600/40 text-sm font-bold border border-green-500/30">
                  ✅ Autorizar
                </button>
              )}
              {(isTeacher || isAdmin) && m.authorized && !m.administered && (
                <button onClick={() => handleAdministered(m.id)}
                  className="px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 text-sm font-bold border border-blue-500/30">
                  💊 Marcar como administrado
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}