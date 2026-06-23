import { useGetStudentsQuery } from "../../../features/students/studentsApi";
import SkeletonTable           from "../../../components/feedback/SkeletonTable";

export default function ParentsPage() {
  // Por ahora mostramos los estudiantes con su info de tutor
  const { data: students = [], isLoading } = useGetStudentsQuery();

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">👨‍👩‍👧 Parents</h1>
        <p className="text-gray-400 mt-1">Family management</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-800">
        <table className="w-full bg-gray-950">
          <thead className="bg-gray-900">
            <tr>
              {["Student","Tutor Name","Tutor Phone","Email"].map((h) => (
                <th key={h} className="p-4 text-left text-gray-400 text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-500">No students found</td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id} className="border-t border-gray-800 hover:bg-gray-900">
                  <td className="p-4 text-white font-medium">
                    {s.first_name} {s.last_name}
                  </td>
                  <td className="p-4 text-gray-300">{s.tutor_name || "—"}</td>
                  <td className="p-4 text-gray-400">{s.tutor_phone || "—"}</td>
                  <td className="p-4 text-gray-400">{s.email || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}