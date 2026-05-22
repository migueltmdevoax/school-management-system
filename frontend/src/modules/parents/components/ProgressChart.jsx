import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ProgressChart({ metrics }) {
  const completed = metrics?.completed ?? 0;
  const pending = metrics?.pending ?? 0;

  const data = [
    { name: "Completadas", value: completed },
    { name: "Pendientes", value: pending },
  ];

  return (
    <div style={{ width: "100%", height: 220 }}>
      <h4 style={{ marginBottom: "10px", color: "#111" }}>
        📊 Progreso
      </h4>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#555" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Bar
            dataKey="value"
            fill="#6366f1"
            radius={[10, 10, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}