import StatusBadge from "./ui/StatusBadge";
import ProgressChart from "./ProgressChart";
import GradesChart from "./GradesChart";

export default function StudentCard({ data }) {
  const { student, metrics, incidents, payments, assignments, grades } = data;

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "20px",
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px"
    }}>
      
      {/* 🧑 INFO */}
      <div>
        <h2 style={{ marginBottom: "10px", color: "#111" }}>
          👦 {student.name}
        </h2>

        <p style={{ color: "#555" }}>
          Promedio: <strong>{metrics.averageGrade}</strong>
        </p>

        <p style={{ marginTop: "5px", color: "#333" }}>
          Estado:{" "}
          <StatusBadge
            average={metrics.averageGrade}
            incidents={metrics.incidentCount}
            payments={metrics.pendingPayments}
          />
        </p>

        <hr style={{ margin: "15px 0" }} />

        <p style={{ color: "#333" }}>🚨 Incidentes: {incidents.length}</p>
        <p style={{ color: "#333" }}>💰 Pagos pendientes: {metrics.pendingPayments}</p>
        <p style={{ color: "#333" }}>📚 Tareas: {assignments.length}</p>
      </div>

      {/* 📊 GRÁFICAS */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <ProgressChart metrics={metrics} />
        <GradesChart grades={grades || []} />
      </div>

    </div>
  );
}