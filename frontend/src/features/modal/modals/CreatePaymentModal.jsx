import { useState }        from "react";
import { useDispatch }     from "react-redux";
import { closeModal }      from "../modalSlice";
import { useCreatePaymentMutation } from "../../payments/paymentsApi";
import { useGetStudentsQuery }      from "../../students/studentsApi";
import { useToast }                 from "../../toast/useToast";

export default function CreatePaymentModal() {
  const dispatch = useDispatch();
  const toast    = useToast();
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  const { data: studentsData = [] }    = useGetStudentsQuery();
  const students = studentsData || [];

  const [form, setForm]   = useState({ studentId: "", amount: "", dueDate: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.studentId || !form.amount) {
      setError("Student and amount are required");
      return;
    }
    try {
      await createPayment({
        studentId: form.studentId,
        amount:    Number(form.amount),
        dueDate:   form.dueDate || null,
      }).unwrap();
      toast.success("Payment created", "Payment registered successfully");
      dispatch(closeModal());
    } catch (err) {
      setError(err?.data?.message || "Error creating payment");
    }
  };

  return (
    <div className="w-full max-w-lg bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">💰 Create Payment</h2>
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Amount *</label>
            <input type="number" value={form.amount}
              onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white outline-none focus:border-blue-500"
              placeholder="0.00" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Due Date</label>
            <input type="date" value={form.dueDate}
              onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white" />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => dispatch(closeModal())}
            className="px-5 py-3 rounded-2xl bg-gray-800 text-white hover:bg-gray-700">Cancel</button>
          <button type="submit" disabled={isLoading}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
            {isLoading ? "Saving..." : "💰 Create Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}