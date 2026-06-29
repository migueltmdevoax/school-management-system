import DashboardCard from "./DashboardCard";

export default function AttendanceStatsGrid({ stats }) {
  if (!stats) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard title="Presente" value={stats.present} icon="🟢" subtitle="Students present" />
      <DashboardCard title="Ausente"  value={stats.absent}  icon="🔴" subtitle="Students absent" />
      <DashboardCard title="Con retardo"    value={stats.late}    icon="🟡" subtitle="Late arrivals" />
    </div>
  );
}