import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../modalSlice";
import { useAddStudentMutation } from "../../../features/students/studentsApi";
import { useGetGroupsQuery } from "../../../features/groups/groupsApi";
import { useToast } from "../../../features/toast/useToast";

export default function CreateStudentModal() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [addStudent, { isLoading }] = useAddStudentMutation();
  const { data: groupsResponse } = useGetGroupsQuery();
  const groups = groupsResponse?.data || [];

  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "",
    age: "", phone: "", address: "",
    tutor_name: "", tutor_phone: "", group_id: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.first_name.trim() || !form.last_name.trim()) {
      setError("First name and last name are required");
      return;
    }
    try {
      await addStudent({
        ...form,
        age: form.age ? Number(form.age) : null,
        group_id: form.group_id || null,
      }).unwrap();
      toast.success("Student created", "Student registered successfully");
      dispatch(closeModal());
    } catch (err) {
      setError(err?.data?.message || err?.message || "Error creating student");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">👨‍🎓 New Student</h2>
        <button onClick={() => dispatch(closeModal())} className="text-gray-400 hover:text-white text-2xl">✕</button>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name *" name="first_name" value={form.first_name} onChange={handleChange} />
          <Field label="Last Name *" name="last_name" value={form.last_name} onChange={handleChange} />
        </div>
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Age" name="age" type="number" value={form.age} onChange={handleChange} />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Address</label>
          <textarea
            name="address" value={form.address} onChange={handleChange} rows={2}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white outline-none focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tutor Name" name="tutor_name" value={form.tutor_name} onChange={handleChange} />
          <Field label="Tutor Phone" name="tutor_phone" value={form.tutor_phone} onChange={handleChange} />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Group</label>
          <select
            name="group_id" value={form.group_id} onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white"
          >
            <option value="">No group</option>
            {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => dispatch(closeModal())}
            className="px-5 py-3 rounded-2xl bg-gray-800 text-white hover:bg-gray-700">
            Cancel
          </button>
          <button type="submit" disabled={isLoading}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
            {isLoading ? "Saving..." : "🚀 Create Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-1 block">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange}
        className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white outline-none focus:border-blue-500" />
    </div>
  );
}