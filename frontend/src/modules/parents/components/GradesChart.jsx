import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function GradesChart({ grades }) {

  const safeGrades = Array.isArray(grades) ? grades : [];

  const data = safeGrades.map((g, index) => ({
    name: `T${index + 1}`,
    score: Number(g.grade)
  }));

  // 👇 si solo hay 1 dato, hacemos línea fake (UX PRO)
  if (data.length === 1) {
    data.push({
      name: "T2",
      score: data[0].score
    });
  }

  if (!data.length) {
    return (
      <div style={{ padding: 10 }}>
        <h4>📈 Evolución</h4>
        <p style={{ color: "#777" }}>Sin calificaciones</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 250 }}>
      <h4 style={{ marginBottom: "10px", color: "#111" }}>
        📈 Evolución
      </h4>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}