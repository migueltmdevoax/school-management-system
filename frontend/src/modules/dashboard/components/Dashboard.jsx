import DashboardCard from "../../../components/ui/DashboardCard"

function Dashboard({ studentsCount, teachersCount, averageAge }) {
  return (
    <div className="dashboard-container">
      <h2>📊 Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Students" 
          value={studentsCount} 
          icon="🎓"
        />

        <DashboardCard 
          title="Teachers" 
          value={teachersCount} 
          icon="👨‍🏫"
        />

        <DashboardCard
         title="Avg Age"
         value={averageAge}
         icon="📐"
        />
      </div>
    </div>
  )
}

export default Dashboard

