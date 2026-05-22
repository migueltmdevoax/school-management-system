function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-secondary p-6 rounded-2xl shadow-lg hover:scale-105 transition-all">
      
      <div className="text-3xl mb-2">{icon}</div>

      <p className="text-sm text-gray-400">{title}</p>

      <h2 className="text-1xl font-bold text-white">{value}</h2>

    </div>
  )
}

export default DashboardCard

const styles = {
  card: {
    padding: "20px",
    borderRadius: "10px",
    background: "#1f2937",
    color: "White",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  },
  icon: {
    fontSize: "30px"
  },
  value: {
    fontSize: "26px",
    fontWeight: "bold"
  }
}
