import { useState }    from "react";
import { useSelector } from "react-redux";
import {
  useGetAllPaymentsQuery,
  useCreatePaymentMutation,
  useMarkAsPaidMutation,
  useDeletePaymentMutation,
} from "../features/payments/paymentsApi";
import { useGetStudentsQuery } from "../features/students/studentsApi";
import { useToast }            from "../features/toast/useToast";
import SkeletonTable           from "../components/feedback/SkeletonTable";
import StudentSearchSelect     from "../components/forms/StudentSearchSelect";

export default function PaymentsPage() {
  const { user }  = useSelector((s) => s.auth);
  const toast     = useToast();
  const isAdmin   = user?.role === "admin";

  const { data, isLoading, refetch }             = useGetAllPaymentsQuery();
  const { data: studentsData = [] }              = useGetStudentsQuery(undefined, { skip: !isAdmin });
  const [createPayment, { isLoading: creating }] = useCreatePaymentMutation();
  const [markAsPaid]                             = useMarkAsPaidMutation();
  const [deletePayment]                          = useDeletePaymentMutation();

  const payments = data?.data || [];
  const students = studentsData || [];

  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ studentId: "", amount: "", dueDate: "" });
  const [error, setError]       = useState("");

  const statusStyles = {
    PAID:    "bg-green-500/20 text-green-400",
    PENDING: "bg-yellow-500/20 text-yellow-400",
    OVERDUE: "bg-red-500/20 text-red-400",
  };

  // 🔥 Normaliza el monto a 2 decimales máximo, sin importar lo que escriba el usuario
  const handleAmountChange = (e) => {
    let value = e.target.value;
    // Permite solo números y un punto decimal
    value = value.replace(/[^0-9.]/g, "");
    // Evita más de un punto decimal
    const parts = value.split(".");
    if (parts.length > 2) value = parts[0] + "." + parts.slice(1).join("");
    // Limita a 2 decimales
    if (parts[1]?.length > 2) value = parts[0] + "." + parts[1].slice(0, 2);
    setForm((p) => ({ ...p, amount: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.studentId || !form.amount) {
      setError("Student and amount are required");
      return;
    }
    const amountNum = Number(form.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Amount must be a valid positive number");
      return;
    }
    try {
      await createPayment({
        studentId: form.studentId,
        amount:    Number(amountNum.toFixed(2)),
        dueDate:   form.dueDate || null,
      }).unwrap();
      toast.success("Payment created", "Payment registered successfully");
      setForm({ studentId: "", amount: "", dueDate: "" });
      setShowForm(false);
    } catch (err) {
      setError(err?.data?.message || "Error creating payment");
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      await markAsPaid(id).unwrap();
      toast.success("Payment updated", "Marked as paid");
      refetch();
    } catch {
      toast.error("Error", "Could not update payment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePayment(id).unwrap();
      toast.success("Deleted", "Payment removed");
    } catch {
      toast.error("Error", "Could not delete payment");
    }
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">💰 Payments</h1>
          <p className="text-gray-400 mt-1">{payments.length} total payments</p>
        </div>
        {isAdmin && (
          <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold">
            {showForm ? "Cancel" : "+ New Payment"}
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Create Payment</h2>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Amount *</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={form.amount}
                  onChange={handleAmountChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white outline-none focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Due Date</label>
                <input type="date" value={form.dueDate}
                  onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-2xl bg-gray-800 text-white">Cancel</button>
              <button type="submit" disabled={creating}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
                {creating ? "Saving..." : "💰 Create Payment"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-gray-800">
        <table className="w-full bg-gray-950">
          <thead className="bg-gray-900">
            <tr>
              {["Student","Amount","Status","Due Date","Actions"].map((h) => (
                <th key={h} className="p-4 text-left text-gray-400 text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-500">No payments found</td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="border-t border-gray-800 hover:bg-gray-900">
                  <td className="p-4 text-white">{p.first_name} {p.last_name}</td>
                  <td className="p-4 text-white font-bold">${Number(p.amount).toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[p.status] || statusStyles.PENDING}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{p.due_date || "—"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {isAdmin && p.status !== "PAID" && (
                        <button onClick={() => handleMarkPaid(p.id)}
                          className="px-3 py-1 rounded-xl bg-green-600/20 text-green-400 hover:bg-green-600/40 text-xs font-bold">
                          Mark Paid
                        </button>
                      )}
                      {isAdmin && (
                        <button onClick={() => handleDelete(p.id)}
                          className="px-3 py-1 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/40 text-xs font-bold">
                          Delete
                        </button>
                      )}
                      {!isAdmin && (
                        <span className="text-gray-500 text-xs">View only</span>
                      )}
                    </div>
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