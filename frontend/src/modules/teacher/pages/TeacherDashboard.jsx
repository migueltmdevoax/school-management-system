import { useMemo, useState } from "react";
import { useGetMyDashboardQuery, useGetMyStudentsQuery, useGetMyGradesQuery } from "../../../features/me/meApi";
import SkeletonDashboard from "../../../components/feedback/SkeletonDashboard";

export default function TeacherDashboard() {
  const { data: dashboardRes, isLoading: dLoading } = useGetMyDashboardQuery();
  const { data: studentsRes, isLoading: sLoading } = useGetMyStudentsQuery();
  const { data: gradesRes, isLoading: gLoading } = useGetMyGradesQuery();

  const [search, setSearch] = useState("");

  const dashboard = dashboardRes?.data || {};
  const students  = studentsRes?.data  || [];
  const grades    = gradesRes?.data    || [];

  const studentsWithMetrics = useMemo(() => {
    return students.map((student) => {
      const sg = grades.filter((g) => String(g.student_id) === String(student.id));
      const avg = sg.length > 0
        ? sg.reduce((acc, g) => acc + Number(g.grade || 0), 0) / sg.length : 0;
      const progress = Math.min(sg.length * 20, 100);
      let riskLevel = "low";
      if (avg < 70 || progress < 40) riskLevel = "high";
      else if (avg < 80) riskLevel = "medium";
      return { ...student, grades: sg, average: avg, progress, totalGrades: sg.length, riskLevel };
    });
  }, [students, grades]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return studentsWithMetrics
      .filter((s) =>
        `${s.first_name} ${s.last_name}`.toLowerCase().includes(q) ||
        String(s.id).includes(q)
      )
      .sort((a, b) => {
        if (a.riskLevel === "high" && b.riskLevel !== "high") return -1;
        return a.average - b.average;
      });
  }, [search, studentsWithMetrics]);

  const riskConfig = {
    high:   { label: "🔴 High Risk",  border: "border-red-500/30",    badge: "bg-red-500/20 text-red-300",    bar: "bg-red-500" },
    medium: { label: "🟡 Attention",  border: "border-yellow-500/30", badge: "bg-yellow-500/20 text-yellow-300", bar: "bg-yellow-500" },
    low:    { label: "🟢 Excellent",  border: "border-green-500/20",  badge: "bg-green-500/20 text-green-300",  bar: "bg-blue-500" },
  };

  if (dLoading || sLoading || gLoading) {
    return <div className="p-6"><SkeletonDashboard /></div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white">👨‍🏫 Teacher Dashboard</h1>
          <p className="text-gray-400 mt-1">Academic Operations Center</p>
        </div>
        <input type="text" placeholder="Search students..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full xl:w-[380px] bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-blue-500" />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { title: "Students",    value: dashboard.totalStudents    || students.length },
          { title: "At Risk",     value: dashboard.riskStudents     || filtered.filter((s) => s.riskLevel === "high").length, danger: true },
          { title: "Assignments", value: dashboard.totalAssignments || 0 },
          { title: "Group Avg",   value: studentsWithMetrics.length > 0
              ? (studentsWithMetrics.reduce((a, s) => a + s.average, 0) / studentsWithMetrics.length).toFixed(1)
              : "0.0" },
        ].map((k) => (
          <div key={k.title} className={`bg-gray-900 border ${k.danger ? "border-red-500/30" : "border-gray-800"} rounded-3xl p-5`}>
            <p className="text-gray-400 text-sm">{k.title}</p>
            <h2 className="text-3xl font-black text-white mt-2">{k.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filtered.map((student) => {
          const cfg = riskConfig[student.riskLevel] || riskConfig.low;
          return (
            <div key={student.id} className={`bg-gray-900 border ${cfg.border} rounded-3xl p-6 shadow-xl`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{student.first_name} {student.last_name}</h2>
                  <p className="text-gray-500 text-sm mt-1">{student.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${cfg.badge}`}>{cfg.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Average",  value: student.average.toFixed(1) },
                  { label: "Progress", value: `${student.progress}%` },
                  { label: "Tasks",    value: student.totalGrades },
                ].map((m) => (
                  <div key={m.label} className="bg-gray-800 rounded-2xl p-3 text-center">
                    <p className="text-gray-400 text-xs">{m.label}</p>
                    <h3 className="text-white font-bold mt-1">{m.value}</h3>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${student.progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}