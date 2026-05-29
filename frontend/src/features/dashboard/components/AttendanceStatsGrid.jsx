import DashboardCard
from "./DashboardCard";

export default function AttendanceStatsGrid({

  stats,

}) {

  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
    ">

      <DashboardCard
        title="Present"
        value={stats.present}
        icon="🟢"
        subtitle="Students present"
      />





      <DashboardCard
        title="Absent"
        value={stats.absent}
        icon="🔴"
        subtitle="Students absent"
      />





      <DashboardCard
        title="Late"
        value={stats.late}
        icon="🟡"
        subtitle="Late arrivals"
      />

    </div>

  );

}