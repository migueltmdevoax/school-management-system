import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetStudentsQuery } from "../../students/studentsApi";

export default function GlobalSearchModal({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: students = [] } = useGetStudentsQuery();

  const results = students.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.first_name?.toLowerCase().includes(q) ||
      s.last_name?.toLowerCase().includes(q)  ||
      s.email?.toLowerCase().includes(q)
    );
  });

  const handleSelect = (student) => {
    navigate("/app/students");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 p-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-800 bg-gray-900 shadow-2xl">
        <div className="border-b border-gray-800 p-4">
          <input
            autoFocus value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cualquier cosa..."
            className="w-full bg-transparent text-lg text-white outline-none placeholder:text-gray-500"
          />
        </div>
        <div className="max-h-[500px] overflow-y-auto p-2">
          {query && results.map((student) => (
            <button key={student.id} onClick={() => handleSelect(student)}
              className="w-full rounded-2xl p-4 text-left transition-all hover:bg-gray-800">
              <h3 className="font-semibold text-white">
                {student.first_name} {student.last_name}
              </h3>
              <p className="text-sm text-gray-400">{student.email}</p>
            </button>
          ))}
          {query && results.length === 0 && (
            <p className="p-6 text-center text-gray-500">Sin resultados encontrados</p>
          )}
        </div>
      </div>
    </div>
  );
}