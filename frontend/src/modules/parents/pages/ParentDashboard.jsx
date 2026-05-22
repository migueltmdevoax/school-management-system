import {
  useGetMyStudentsQuery
} from "../../../features/me/meApi";

import StudentCard from "../components/StudentCard.jsx";

export default function ParentDashboard() {
  const {
  data: studentsResponse,
  isLoading,
  error,
} = useGetMyStudentsQuery();

const data =
  studentsResponse?.data || [];

  if (isLoading) return <p style={{ padding: 20 }}>Cargando...</p>;
  if (error) return <p>Error cargando datos</p>;
  if (!data || data.length === 0) return <p>No hay información disponible</p>;

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
        color: "#111",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>👋 Bienvenido</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {data.map((d) => (
          <StudentCard key={d.student.id} data={d} />
        ))}
      </div>
    </div>
  );
}