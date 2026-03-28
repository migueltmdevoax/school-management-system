function DashboardCard({ title, value, icon }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p style={styles.value}>{value}</p>
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
