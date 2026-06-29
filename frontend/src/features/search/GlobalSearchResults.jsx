import { useDispatch } from "react-redux";
import { openSlideOver } from "../slide-over/slideOverSlice";

const GlobalSearchResults = ({ results }) => {
  const dispatch = useDispatch();
  if (!results) return null;

  const handleOpen = (item) => {
    dispatch(openSlideOver({ type: "student-profile", entityId: item.id }));
  };

  return (
    <div className="space-y-6">
      {results.students?.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-gray-400">Estudiantes</p>
          <div className="space-y-2">
            {results.students.map((s) => (
              <button key={s.id} onClick={() => handleOpen(s)}
                className="w-full rounded-2xl border border-gray-200 p-4 text-left transition hover:bg-gray-50">
                <p className="font-medium">{s.first_name} {s.last_name}</p>
                <p className="mt-1 text-sm text-gray-500">{s.email}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {results.teachers?.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-gray-400">Teachers</p>
          <div className="space-y-2">
            {results.teachers.map((t) => (
              <button key={t.id}
                className="w-full rounded-2xl border border-gray-200 p-4 text-left transition hover:bg-gray-50">
                <p className="font-medium">{t.first_name} {t.last_name}</p>
                <p className="mt-1 text-sm text-gray-500">{t.email}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearchResults;