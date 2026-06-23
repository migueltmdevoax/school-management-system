import RiskStudentRow from "./RiskStudentRow";

export default function RiskStudentsCard({ students = [] }) {
  return (
    <div className="rounded-3xl border border-gray-800 bg-gray-900/70 backdrop-blur-xl p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Students Requiring Attention</h2>
      </div>
      <div className="space-y-4">
        {students.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No at-risk students</p>
        ) : (
          students.map((student) => (
            <RiskStudentRow key={student.id} student={student} />
          ))
        )}
      </div>
    </div>
  );
}