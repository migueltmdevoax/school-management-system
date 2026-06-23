import { useState, useRef, useEffect } from "react";

export default function StudentSearchSelect({ students = [], value, onChange, placeholder = "Search student..." }) {
  const [search, setSearch] = useState("");
  const [open, setOpen]     = useState(false);
  const ref = useRef(null);

  const selectedStudent = students.find((s) => s.id === value);

  const filtered = students.filter((s) =>
    `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (student) => {
    onChange(student.id);
    setSearch("");
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-3 text-left text-white flex items-center justify-between"
      >
        <span className={selectedStudent ? "text-white" : "text-gray-500"}>
          {selectedStudent
            ? `${selectedStudent.first_name} ${selectedStudent.last_name}`
            : placeholder}
        </span>
        <span className="text-gray-500">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-gray-800">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a name..."
              className="w-full bg-gray-800 rounded-xl p-2 text-white text-sm outline-none border border-gray-700 focus:border-blue-500"
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-4 text-center text-gray-500 text-sm">No students found</p>
            ) : (
              filtered.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelect(s)}
                  className={`w-full text-left p-3 hover:bg-gray-800 transition flex items-center gap-3 ${
                    s.id === value ? "bg-blue-500/10" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {s.first_name?.[0]}{s.last_name?.[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{s.first_name} {s.last_name}</p>
                    {s.group_name && <p className="text-gray-500 text-xs">{s.group_name}</p>}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}