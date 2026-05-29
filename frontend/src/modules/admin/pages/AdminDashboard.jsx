import {
  useGetDashboardQuery,
} from "../../../features/dashboard/dashboardApi";

import DashboardGrid
from "../../../features/dashboard/components/DashboardGrid";

import DashboardCard
from "../../../features/dashboard/components/DashboardCard";

import AttendanceChart
from "../../../features/dashboard/charts/AttendanceChart";

import PaymentsChart
from "../../../features/dashboard/charts/PaymentsChart";

import IncidentsChart
from "../../../features/dashboard/charts/IncidentsChart";

import RecentActivityFeed
from "../../../features/activity/components/RecentActivityFeed";

import RiskStudentsCard
from "../../../features/dashboard/components/RiskStudentsCard";

import AttendanceOverviewCard
from "../../../features/dashboard/components/AttendanceOverviewCard";

import QuickActionsPanel
from "../../../features/dashboard/components/QuickActionsPanel";

import SkeletonDashboard
from "../../../components/feedback/SkeletonDashboard";

import AttendanceStatsGrid
from "../../../features/dashboard/components/AttendanceStatsGrid";

import AttendanceRateCard
from "../../../features/dashboard/components/AttendanceRateCard";

import AttendanceHeatmap
from "../../../features/dashboard/components/AttendanceHeatmap";


export default function AdminDashboard() {

  const {

    data,

    isLoading,

  } = useGetDashboardQuery();




  if (isLoading) {

    return (

      <div className="p-6">

        <SkeletonDashboard />

      </div>

    );

  }




  const metrics =
    data?.data;





  return (

    <div className="
      space-y-8
    ">

      {/* HEADER */}
      <div>

        <h1 className="
          text-4xl
          font-black
          text-white
        ">

          🚀 Admin Dashboard

        </h1>





        <p className="
          mt-2
          text-gray-400
        ">

          Realtime school analytics

        </p>

      </div>





      {/* KPI GRID */}
      <DashboardGrid>

        <DashboardCard
          title="Students"
          value={metrics.students}
          icon="👨‍🎓"
          subtitle="Registered students"
          trend={12}
        />





        <DashboardCard
          title="Pending Payments"
          value={metrics.pendingPayments}
          icon="💰"
          subtitle="Awaiting payment"
          trend={-3}
        />





        <DashboardCard
          title="Incidents"
          value={metrics.incidents}
          icon="🚨"
          subtitle="Recent incidents"
          trend={8}
        />





        <DashboardCard
          title="Attendance"
          value={`${metrics.attendance}%`}
          icon="📈"
          subtitle="Attendance rate"
          trend={5}
        />

      </DashboardGrid>





      {/* QUICK ACTIONS */}
      <QuickActionsPanel />





      {/* ATTENDANCE */}
      <AttendanceStatsGrid
        stats={
          metrics.attendanceStats
        }
      />





      <AttendanceRateCard
        stats={
          metrics.attendanceStats
        }
      />




      <AttendanceHeatmap
        data={
          metrics.attendanceHeatmap
        }
      />





      {/* CHARTS */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">

        <AttendanceChart
          data={[

            {
              name: "Mon",
              attendance: 90,
            },

            {
              name: "Tue",
              attendance: 94,
            },

            {
              name: "Wed",
              attendance: 88,
            },

            {
              name: "Thu",
              attendance: 97,
            },

            {
              name: "Fri",
              attendance: 93,
            },

          ]}
        />





        <RecentActivityFeed
          activities={
            metrics.recentActivity
          }
        />





        <RiskStudentsCard
          students={
            metrics.riskStudents
          }
        />





        <AttendanceOverviewCard
          overview={
            metrics.attendanceOverview
          }
        />





        <PaymentsChart
          data={[

            {
              name: "Jan",
              payments: 14,
            },

            {
              name: "Feb",
              payments: 22,
            },

            {
              name: "Mar",
              payments: 18,
            },

            {
              name: "Apr",
              payments: 30,
            },

          ]}
        />





        <div className="
          xl:col-span-2
        ">

          <IncidentsChart
            data={[

              {
                name: "Week 1",
                incidents: 2,
              },

              {
                name: "Week 2",
                incidents: 5,
              },

              {
                name: "Week 3",
                incidents: 3,
              },

              {
                name: "Week 4",
                incidents: 7,
              },

            ]}
          />

        </div>

      </div>

    </div>

  );

}