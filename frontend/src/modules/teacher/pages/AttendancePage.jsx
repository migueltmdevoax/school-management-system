import { useState }              from "react";
import { useSelector }           from "react-redux";
import { useGetAttendanceQuery, useMarkAttendanceMutation } from "../../../features/attendance/attendanceApi";
import { useToast }              from "../../../features/toast/useToast";
import SkeletonTable             from "../../../components/feedback/SkeletonTable";

export default function AttendancePage() {
  const toast   = useToast();
  const { user } = useSelector((s) => s.auth);
  const isAdmin  = user?.role === "admin";
  const today    = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const { data, isLoading, refetch } = useGetAttendanceQuery(selectedDate);
  const [markAttendance, { isLoading: marking }] = useMarkAttendanceMutation();

  // 🔥 Admin recibe stats, teacher recibe array de estudiantes
  const rawData  = data?.data;
  const students = Array.isArray(rawData) ? rawData : [];
  const adminStats = !Array.isArray(rawData) && rawData ? rawData : null;

  const statusStyles = {
    PRESENT: "bg-green-500/20 text-green-400 border-green-500/30",
    ABSENT:  "bg-red-500/20 text-red-400 border-red-500/30",
    LATE:    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    PENDING: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const handleMark = async (studentId, status) => {
    try {
      await markAttendance({ studentId, status, date: selectedDate }).unwrap();
      toast.success("Attendance marked", `Marked as ${status}`);
      refetch();
    } catch (err) {
      toast.error("Error", err?.data?.message || "Could not mark attendance");
    }
  };

  const summary = {
    PRESENT: students.filter((s) => s.status === "PRESENT").length,
    ABSENT:  students.filter((s) => s.status === "ABSENT").length,
    LATE:    students.filter((s) => s.status === "LATE").length,
    PENDING: students.filter((s) => s.status === "PENDING").length,
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  // 🔥 Vista especial para admin — muestra stats globales
  if (isAdmin) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">📋 Attendance Overview</h1>
            <p className="text-gray-400 mt-1">School-wide attendance stats</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Present", value: adminStats?.present || 0, style: statusStyles.PRESENT },
            { label: "Absent",  value: adminStats?.absent  || 0, style: statusStyles.ABSENT  },
            { label: "Late",    value: adminStats?.late    || 0, style: statusStyles.LATE    },
            { label: "Total",   value: adminStats?.total   || 0, style: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-2xl border p-6 text-center ${stat.style}`}>
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-sm mt-2 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <p className="text-gray-400 text-sm">
            📌 Attendance is marked by teachers from their dashboard. Stats update in real time as teachers register attendance.
          </p>
          {adminStats?.total > 0 && (
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">Attendance Rate</p>
              <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 rounded-full bg-green-500 transition-all"
                  style={{ width: `${Math.round((adminStats.present / adminStats.total) * 100)}%` }}
                />
              </div>
              <p className="text-white font-bold mt-2">
                {Math.round((adminStats.present / adminStats.total) * 100)}% present today
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 🔥 Vista para teacher — lista de estudiantes para marcar asistencia
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">📋 Attendance</h1>
          <p className="text-gray-400 mt-1">Daily attendance tracking</p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(summary).map(([status, count]) => (
          <div key={status} className={`rounded-2xl border p-4 text-center ${statusStyles[status]}`}>
            <p className="text-2xl font-black">{count}</p>
            <p className="text-sm mt-1">{status}</p>
          </div>
        ))}
      </div>

      {/* STUDENT LIST */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              {["Student","Current Status","Mark Attendance"].map((h) => (
                <th key={h} className="p-4 text-left text-gray-400 text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-500">
                  No students found for this date
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.student_id} className="border-t border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {student.first_name?.[0]}{student.last_name?.[0]}
                      </div>
                      <p className="text-white font-medium">
                        {student.first_name} {student.last_name}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[student.status]}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {["PRESENT","ABSENT","LATE"].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleMark(student.student_id, s)}
                          disabled={marking}
                          className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                            student.status === s
                              ? statusStyles[s]
                              : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500"
                          }`}
                        >
                          {s === "PRESENT" ? "✅" : s === "ABSENT" ? "❌" : "⏰"} {s}
                        </button>
                      ))}
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