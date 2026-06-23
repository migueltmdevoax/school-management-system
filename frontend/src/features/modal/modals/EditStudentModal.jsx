import { useState, useEffect } from "react";
import { useDispatch }         from "react-redux";
import { closeModal }          from "../modalSlice";
import { useUpdateStudentMutation } from "../../students/studentsApi";
import { useToast }            from "../../toast/useToast";

export default function EditStudentModal({ student }) {
  const dispatch  = useDispatch();
  const toast     = useToast();
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();

  const [form, setForm] = useState({
    first_name:  "",
    last_name:   "",
    email:       "",
    age:         "",
    phone:       "",
    address:     "",
    tutor_name:  "",
    tutor_phone: "",
  });

  // 🔥 Pre-llena el form con los datos del estudiante
  useEffect(() => {
    if (student) {
      setForm({
        first_name:  student.first_name  || "",
        last_name:   student.last_name   || "",
        email:       student.email       || "",
        age:         student.age         || "",
        phone:       student.phone       || "",
        address:     student.address     || "",
        tutor_name:  student.tutor_name  || "",
        tutor_phone: student.tutor_phone || "",
      });
    }
  }, [student]);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.first_name || !form.last_name) {
      setError("First name and last name are required");
      return;
    }
    try {
      await updateStudent({
        id:   student.id,
        data: { ...form, age: form.age ? Number(form.age) : null },
      }).unwrap();
      toast.success("Student updated", "Changes saved successfully");
      dispatch(closeModal());
    } catch (err) {
      setError(err?.data?.message || "Error updating student");
    }
  };

  const fields = [
    { label: "First Name *", key: "first_name" },
    { label: "Last Name *",  key: "last_name" },
    { label: "Email",        key: "email",       type: "email" },
    { label: "Age",          key: "age",          type: "number" },
    { label: "Phone",        key: "phone" },
    { label: "Address",      key: "address" },
    { label: "Tutor Name",   key: "tutor_name" },
    { label: "Tutor Phone",  key: "tutor_phone" },
  ];

  return (
    <div className="w-full max-w-lg bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">✏️ Edit Student</h2>
        <button onClick={() => dispatch(closeModal())} className="text-gray-400 hover:text-white text-2xl">✕</button>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-2xl text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-sm text-gray-400 mb-1 block">{f.label}</label>
            <input
              type={f.type || "text"}
              value={form[f.key]}
              onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white outline-none focus:border-blue-500"
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => dispatch(closeModal())}
            className="px-5 py-3 rounded-2xl bg-gray-800 text-white hover:bg-gray-700">Cancel</button>
          <button type="submit" disabled={isLoading}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
            {isLoading ? "Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}