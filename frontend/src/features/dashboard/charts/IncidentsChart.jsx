import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import ChartCard from "./ChartCard";

export default function IncidentsChart({ data }) {
  return (
    <ChartCard title="Incidentes">
      <div style={{ width: "100%", minHeight: 288 }}>
        <ResponsiveContainer width="100%" height={288}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}