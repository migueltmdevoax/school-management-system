import { useMemo, useState } from "react";
import {
  useGetMyStudentsQuery,
  useGetMyGradesQuery,
  useGetMyDashboardQuery,
} from "../../../features/me/meApi";

export default function TeacherDashboard() {
  // 🔥 DATA
  const {
    data: studentsResponse,
    isLoading: studentsLoading,
  } = useGetMyStudentsQuery();

  const {
    data: gradesResponse,
    isLoading: gradesLoading,
  } = useGetMyGradesQuery();

  const {
    data: dashboardResponse,
  } = useGetMyDashboardQuery();

  const students = studentsResponse?.data || [];
  const grades = gradesResponse?.data || [];
  const dashboard = dashboardResponse?.data || {};

  // 🔥 SEARCH
  const [search, setSearch] = useState("");

  // 🔥 LOADING
  const isLoading = studentsLoading || gradesLoading;

  if (isLoading) {
    return (
      <div className="p-10 text-white">
        Loading dashboard...
      </div>
    );
  }

  // 🔥 METRICS ENGINE
  const studentsWithMetrics = useMemo(() => {
    return students.map((student) => {
      const studentGrades = grades.filter(
        (g) => String(g.student_id) === String(student.id)
      );
      const totalGrades = studentGrades.length;
      const average =
        totalGrades > 0
          ? studentGrades.reduce(
              (acc, g) => acc + Number(g.grade || 0),
              0
            ) / totalGrades
          : 0;
      const progress = Math.min(totalGrades * 20, 100);

      let riskLevel = "low";
      if (average < 7 || progress < 40) {
        riskLevel = "high";
      } else if (average < 8) {
        riskLevel = "medium";
      }

      return {
        ...student,
        grades: studentGrades,
        average,
        progress,
        totalGrades,
        riskLevel,
      };
    });
  }, [students, grades]);

  // 🔥 SEARCH ENGINE
  const filteredStudents = useMemo(() => {
    return studentsWithMetrics.filter((student) => {
      const query = search.toLowerCase();
      return (
        student.name?.toLowerCase().includes(query) ||
        String(student.id).includes(query)
      );
    });
  }, [search, studentsWithMetrics]);

  // 🔥 PRIORITY SORT
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a.riskLevel === "high" && b.riskLevel !== "high") return -1;
    return a.average - b.average;
  });

  // 🔥 KPIs — ahora desde el backend
  const totalStudents = dashboard.totalStudents || 0;
  const riskStudents = dashboard.riskStudents || 0;
  const totalAssignments = dashboard.totalAssignments || 0;

  const averageProgress =
    studentsWithMetrics.length > 0
      ? Math.round(
          studentsWithMetrics.reduce((acc, s) => acc + s.progress, 0) /
            studentsWithMetrics.length
        )
      : 0;

  const groupAverage =
    studentsWithMetrics.length > 0
      ? (
          studentsWithMetrics.reduce((acc, s) => acc + s.average, 0) /
          studentsWithMetrics.length
        ).toFixed(1)
      : 0;

  // 🔥 STATUS ENGINE
  const getStatus = (riskLevel) => {
    if (riskLevel === "high")
      return { label: "🔴 Riesgo", color: "text-red-400", border: "border-red-500/30" };
    if (riskLevel === "medium")
      return { label: "🟡 Atención", color: "text-yellow-400", border: "border-yellow-500/30" };
    return { label: "🟢 Excelente", color: "text-green-400", border: "border-green-500/20" };
  };

  return (
    <div className="p-6 space-y-6">
      {/* 🔥 HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white">👨‍🏫 Teacher Dashboard</h1>
          <p className="text-gray-400 mt-1">Academic Operations Center</p>
        </div>
        <div className="w-full xl:w-[400px]">
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* 🔥 KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <KpiCard title="Students" value={totalStudents} />
        <KpiCard title="At Risk" value={riskStudents} danger />
        <KpiCard title="Assignments" value={totalAssignments} />
        <KpiCard title="Group Average" value={groupAverage} />
        <KpiCard title="Progress" value={`${averageProgress}%`} />
      </div>

      {/* 🔥 STUDENTS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sortedStudents.map((student) => {
          const status = getStatus(student.riskLevel);
          return (
            <div
              key={student.id}
              className={`bg-gray-900 border ${status.border} rounded-3xl p-6 shadow-xl transition-all hover:scale-[1.01]`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">{student.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">ID: {student.id}</p>
                </div>
                <span className={`font-semibold ${status.color}`}>{status.label}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <MetricCard label="Average" value={student.average.toFixed(1)} />
                <MetricCard label="Progress" value={`${student.progress}%`} />
                <MetricCard label="Tasks" value={student.totalGrades} />
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Academic Progress</span>
                  <span className="text-white">{student.progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {student.grades.length > 0 ? (
                  student.grades.map((grade) => (
                    <div
                      key={grade.id}
                      className="bg-gray-800 rounded-2xl px-4 py-3 flex justify-between items-center"
                    >
                      <span className="text-gray-300">{grade.assignment_title}</span>
                      <span className="text-white font-bold">{grade.grade}</span>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-800 rounded-2xl p-4 text-gray-500">
                    No assignments yet
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all">
                  ➕ Add Grade
                </button>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-2xl font-semibold transition-all">
                  🚨 Incident
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-semibold transition-all">
                  📚 Assignment
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-2xl font-semibold transition-all">
                  👁 View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KpiCard({ title, value, danger }) {
  return (
    <div className={`bg-gray-900 border ${danger ? "border-red-500/30" : "border-gray-800"} rounded-3xl p-5`}>
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-black text-white mt-2">{value}</h2>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-xs">{label}</p>
      <h3 className="text-white text-xl font-bold mt-1">{value}</h3>
    </div>
  );
}